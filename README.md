# Task Management API

This project is a Task Management API built with Node.js, Express, and MongoDB. It allows users to manage projects and their associated tasks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd Task
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   PORT=5000
   ```

## Usage

To start the server, run the following command:
```
npm start
```

The server will run on the specified port (default is 5000).

## API Endpoints

- **GET** `/api/projects` - Retrieve all projects
- **POST** `/api/projects` - Create a new project
- **PATCH** `/api/projects/:id` - Update project status
- **DELETE** `/api/projects/:id` - Delete a project

## Environment Variables

- `MONGODB_URI`: The connection string for your MongoDB database.
- `PORT`: The port on which the server will run.

## License

This project is licensed under the MIT License.