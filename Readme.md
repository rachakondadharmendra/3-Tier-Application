# 3-Tier Project

This repository contains the code for a 3-Tier application, which includes a frontend built with ReactJS, a backend built with Golang, and a MongoDB database.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Learning Outcomes](#learning-outcomes)
- [Contributing](#contributing)
- [License](#license)

## Table of Contents

- Project Structure
- Installation
- Usage
- Learning Outcomes
- Contributing
- License


## Project Structure

The project is structured as follows:

- `frontend_reactjs`: This directory contains the frontend code of the application, built using ReactJS.
- `backend_golang`: This directory contains the backend code of the application, built using Golang.
- `db_mongo`: This directory contains the necessary configuration to set up MongoDB either using Mongo Atlas or a Docker container with Docker Compose.

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/rachakondadharmendra/3-tier-project/
    ```
2. Navigate to each project directory (`frontend_reactjs`, `backend_golang`, `db_mongo`) and follow the installation instructions in their respective README files.

## Usage

After setting up each part of the project, you can start the application by running the frontend and backend servers, and ensuring that the MongoDB database is running. For detailed usage instructions, refer to the README files in each project directory.

## Learning Outcomes

This project is a great opportunity to learn and understand the following concepts:

1. **Full Stack Development**: This project involves working with frontend, backend, and database technologies, providing a comprehensive understanding of full stack development.

2. **ReactJS**: The frontend of this application is built using ReactJS, a popular JavaScript library for building user interfaces. You can learn about components, state, props, hooks, and more.

3. **Golang**: The backend of this application is built using Golang. This gives you a chance to understand how to structure a backend application, handle requests and responses, and work with middleware.

4. **MongoDB**: This project uses MongoDB as its database. You can learn about NoSQL databases, creating schemas, and performing CRUD operations.

5. **Docker and Docker Compose**: This project uses Docker and Docker Compose for setting up the development environment. This is a great way to understand containerization and how to use Docker to simplify the setup process.

6. **MongoDB Atlas**: If you choose to use MongoDB Atlas for the database, you can learn about cloud databases and how to set them up.

7. **Version Control with Git and GitHub**: The project is hosted on GitHub, providing a practical understanding of using Git for version control.

8. **Dynamic Environment Variables**: This project demonstrates how to dynamically set up `.env` values from Docker Compose or Kubernetes secrets at the time of running a container. This is a crucial aspect of deploying applications, as it allows you to manage sensitive information securely and separately from the code. It also provides flexibility as you can alter the environment variables without changing the application's code.

Remember, the best way to learn is by doing. Don't hesitate to modify the code, experiment with new ideas, and break things to learn more!


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

