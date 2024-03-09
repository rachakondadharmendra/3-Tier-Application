package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	messagesCollection *mongo.Collection
	logger             *log.Logger
)

type Message struct {
	RowNumber int    `json:"rowNumber"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Message   string `json:"message"`
	Status    bool   `json:"status"`
}


func enableCors(w *http.ResponseWriter) {
    (*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    (*w).Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
}

func main() {
	// Initialize logger
	logFile, err := os.OpenFile("server.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatal("Error opening log file:", err)
	}
	defer logFile.Close()
	logger = log.New(logFile, "", log.Ldate|log.Ltime|log.Lshortfile)

	// Load environment variables from .env file
	err = godotenv.Load()
	if err != nil {
		logger.Fatal("Error loading .env file:", err)
	}

	// Connect to MongoDB
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI"))
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		logger.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		logger.Fatal(err)
	}
	defer client.Disconnect(ctx)

	// Set collection
	messagesCollection = client.Database("test").Collection("messages")

	// Define HTTP routes
	router := mux.NewRouter()
	router.HandleFunc("/insertdata", insertDataHandler).Methods("POST")
	router.HandleFunc("/getdata", getDataHandler).Methods("GET")
	router.HandleFunc("/updatedata/{id}", updateDataHandler).Methods("PUT")
	router.HandleFunc("/deletedata/{id}", deleteDataHandler).Methods("DELETE")

	// Start HTTP server
	fmt.Println("Server is running on port 8080...")
	logger.Println("Server is running on port 8080...")
    // Define CORS middleware
    headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
    originsOk := handlers.AllowedOrigins([]string{"*"})
    methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

    // Apply CORS middleware to your router
    log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}

func insertDataHandler(w http.ResponseWriter, r *http.Request) {
	// Parse request body
	var message Message
	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		logger.Println("Error decoding request body:", err)
		return
	}

	// Auto-fill starting row number
	rowNumber, err := getNextRowNumber()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logger.Println("Error getting next row number:", err)
		return
	}
	message.RowNumber = rowNumber

	// Insert data into MongoDB
	_, err = messagesCollection.InsertOne(context.Background(), message)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logger.Println("Error inserting data into MongoDB:", err)
		return
	}

	// Log inserted data with timestamp
	logger.Printf("[%s] Data inserted: %+v\n", time.Now().Format(time.Stamp), message)

	// Respond with success message
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "Data inserted successfully")
	logger.Println("Data inserted successfully")
}

func getDataHandler(w http.ResponseWriter, r *http.Request) {
	// Retrieve data from MongoDB
	cursor, err := messagesCollection.Find(context.Background(), bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logger.Println("Error retrieving data from MongoDB:", err)
		return
	}
	defer cursor.Close(context.Background())

	// Extract data from cursor
	var messages []Message
	for cursor.Next(context.Background()) {
		var message Message
		err := cursor.Decode(&message)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			logger.Println("Error decoding message from cursor:", err)
			return
		}
		messages = append(messages, message)
	}

	// Convert result to JSON
	jsonData, err := json.Marshal(messages)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logger.Println("Error marshalling messages to JSON:", err)
		return
	}

	// Set Content-Type header and write response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
	logger.Println("Data retrieved successfully")
}

func updateDataHandler(w http.ResponseWriter, r *http.Request) {
	// Parse ID parameter
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		logger.Println("Invalid ID:", err)
		return
	}

	// Parse request body
	var updatedMessage Message
	if err := json.NewDecoder(r.Body).Decode(&updatedMessage); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		logger.Println("Error decoding request body:", err)
		return
	}

	// Log values for debugging
	logger.Printf("URL ID: %d\n", id)
	logger.Printf("Request Body RowNumber: %d\n", updatedMessage.RowNumber)

	// Check if rowNumber in request body matches the ID parameter


	// Update data in MongoDB
    filter := bson.M{"rowNumber": id}
    update := bson.M{"$set": bson.M{
        "name":    updatedMessage.Name,
        "email":   updatedMessage.Email,
        "message": updatedMessage.Message,
        "status":  updatedMessage.Status,
    }}
    
    // Log filter details for debugging
    logger.Printf("Filter details: %+v\n", filter)
    
    result, err := messagesCollection.UpdateOne(context.Background(), filter, update)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        logger.Println("Error updating data in MongoDB:", err)
        return
    }
    
    // Check if any document was updated
    if result.ModifiedCount == 0 {
        // Log values of rowNumber and id for debugging
        logger.Printf("rowNumber: %d, id: %d\n", updatedMessage.RowNumber, id)
    
        http.Error(w, fmt.Sprintf("No document found with ID: %d", id), http.StatusNotFound)
        logger.Printf("No document found with ID: %d\n", id)
        return
    }

	// Log updated data with timestamp
	logger.Printf("[%s] Data updated: %+v\n", time.Now().Format(time.Stamp), updatedMessage)

	// Respond with success message
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Data updated successfully")
	logger.Println("Data updated successfully")
}



func deleteDataHandler(w http.ResponseWriter, r *http.Request) {
	// Parse ID parameter
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		logger.Println("Invalid ID:", err)
		return
	}

	// Delete data from MongoDB
	filter := bson.M{"rowNumber": id}
	_, err = messagesCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		logger.Println("Error deleting data from MongoDB:", err)
		return
	}

	// Log deletion with timestamp
	logger.Printf("[%s] Data deleted with ID: %d\n", time.Now().Format(time.Stamp), id)

	// Respond with success message
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Data deleted successfully")
	logger.Println("Data deleted successfully")
}

func getNextRowNumber() (int, error) {
	// Count documents in the collection
	count, err := messagesCollection.CountDocuments(context.Background(), bson.M{})
	if err != nil {
		return 0, err
	}
	return int(count) + 1, nil
}
