# MongoDB configuration Assistance

This folder contains the necessary configuration to set up MongoDB either using Mongo Atlas or a Docker container with Docker Compose for your backend Golang application.

## Using MongoDB Atlas

To set up MongoDB using Mongo Atlas, follow these steps:

1. **Sign Up/Login to MongoDB Atlas**: Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up or login to your account.

2. **Create a Cluster**: Once logged in, create a new cluster by following the instructions provided by MongoDB Atlas. Make sure to configure your cluster according to your requirements.

3. **Get Connection URI**: After creating the cluster, obtain the connection URI which will be used by your application to connect to the database. The connection URI should be in the format:

   ```
   mongodb://<username>:<password>@<host>:<port>/
   ```

4. **Configure Backend Environment Variables**: Open the `.env` file in your backend Golang application and set the following environment variables:

   ```plaintext
   MONGODB_URI=<connection_uri>
   DB_NAME="mongo_db"
   MONGODB_COLLECTION_NAME="messages"
   SERVER_PORT=8080
   DB_USERNAME="<username>"
   DB_PASSWORD="<password>"
   LOG_FILE_PATH=./logs/server.log
   ```

   Replace `<connection_uri>`, `<username>`, and `<password>` with the appropriate values obtained from MongoDB Atlas.

## Using Docker Container with Docker Compose

To set up MongoDB using a Docker container with Docker Compose, follow these steps:

1. **Clone the Repository**: Clone the repository containing the `docker-compose.yml` file into your local environment.

2. **Start Docker Containers**: Navigate to the root of the repository and run the following command to start the Docker containers:

   ```
   docker-compose up -d
   ```

   This command will spin up a MongoDB container and a MongoDB Express container (UI for MongoDB) along with your backend Golang application and any other services defined in the `docker-compose.yml` file.

3. **Access MongoDB Express UI**: You can access the MongoDB Express UI by visiting `http://localhost:8081` in your web browser. Use the same credentials provided in the `.env` file to login to the MongoDB Express UI.

4. **Configure Backend Environment Variables**: Open the `.env` file in your backend Golang application and set the following environment variables:

   ```plaintext
   MONGODB_URI=mongodb://<username>:<password>@db:27017/
   DB_NAME="mongo_db"
   MONGODB_COLLECTION_NAME="messages"
   SERVER_PORT=8080
   DB_USERNAME="<username>"
   DB_PASSWORD="<password>"
   LOG_FILE_PATH=./logs/server.log
   ```

   Replace `<username>` and `<password>` with the credentials you provided in the `docker-compose.yml` file.

## Additional Notes

- Ensure that you have Docker and Docker Compose installed on your system before using the Docker container setup.
- Make sure to replace placeholders (`<connection_uri>`, `<username>`, `<password>`) with actual values according to your MongoDB Atlas configuration or Docker setup.
- For further assistance, refer to the documentation provided by MongoDB Atlas or Docker depending on the method chosen for setting up MongoDB.