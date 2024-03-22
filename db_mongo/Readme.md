# MongoDB Configuration Guide for Backend Golang Application

This guide provides detailed instructions on how to configure MongoDB for your backend Golang application. You can set up MongoDB using either MongoDB Atlas or Docker Compose.

## Table of Contents

- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Docker Compose Setup](#docker-compose-setup)
- [Additional Notes](#additional-notes)

## MongoDB Atlas Setup

Follow these steps to set up MongoDB using MongoDB Atlas:

1. **Sign Up/Login to MongoDB Atlas**: Visit the MongoDB Atlas website and create a new account or log in to your existing account.

2. **Create a Cluster**: After logging in, create a new cluster. Follow the instructions provided by MongoDB Atlas and configure your cluster based on your specific requirements.

3. **Create a New User**: In the MongoDB Atlas dashboard, navigate to the "Database Access" section under the "Security" menu. Click on "Add New Database User", and fill in the details for the new user. Make sure to assign appropriate permissions based on your needs.

4. **Whitelist Server IP**: In the MongoDB Atlas dashboard, navigate to the "Network Access" section under the "Security" menu. Click on "Add IP Address", and add the IP address of your server to the whitelist. This will allow your server to connect to the MongoDB Atlas cluster.

5. **Get Connection URI**: Once the cluster is created, obtain the connection URI. Your application will use this URI to connect to the database. The connection URI should be in the following format:

   ```
   mongodb://<username>:<password>@<host>:<port>/
   ```

4. **Configure Backend Environment Variables**: Update the `.env` file in your backend Golang application with the following environment variables:

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

## Docker Compose Setup

Follow these steps to set up MongoDB using Docker Compose:

1. **Clone the Repository**: Clone the repository that contains the `docker-compose.yml` file.

2. **Start Docker Containers**: Navigate to the root directory of the repository and run the following command to start the Docker containers:

   ```
   docker-compose up -d
   ```

   This command will start a MongoDB container, a MongoDB Express container (a UI for MongoDB), your backend Golang application, and frontend Reactjs application services defined in the `docker-compose.yml` file.

3. **Access MongoDB Express UI**: Open a web browser and visit `http://localhost:8081`. Use the credentials provided in the `.env` file to log in to the MongoDB Express UI.

4. **Configure Backend Environment Variables**: Update the `.env` file in your backend Golang application with the following environment variables:

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
