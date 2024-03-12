package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"

	"backend_golang/db"
	"backend_golang/handlers"
	"backend_golang/logger"
)

func main() {
	// Initialize logger
	logger := logger.InitLogger()

	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		logger.Fatal("Error loading .env file:", err)
	}

	// Connect to MongoDB
	err = db.ConnectMongoDB(logger)
	if err != nil {
		logger.Fatal(err)
	}
	defer db.DisconnectMongoDB(logger)

	// Define HTTP routes with CORS configuration
	router := mux.NewRouter()
	router.HandleFunc("/insertdata", handlers.InsertDataHandler).Methods("POST")
	router.HandleFunc("/getdata", handlers.GetDataHandler).Methods("GET")
	router.HandleFunc("/updatedata/{id}", handlers.UpdateDataHandler).Methods("PUT")
	router.HandleFunc("/deletedata/{id}", handlers.DeleteDataHandler).Methods("DELETE")

	// Apply CORS middleware
	corsHandler := cors.Default().Handler(router)

	// Start HTTP server
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}
	addr := ":" + port
	fmt.Printf("Server is running on port %s...\n", port)
	logger.Printf("Server is running on port %s...\n", port)
	log.Fatal(http.ListenAndServe(addr, corsHandler))
}
