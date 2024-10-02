Todo List Backend Application

This is a simple backend application for managing a Todo List. It provides RESTful API endpoints to create, read, update, and delete todo items. The application is built using Node.js, Express, and MySQL.

Features
Create Todo: Add a new to do item.
Get Todos: Retrieve to do items for User wise .
Update Todo: Update to do item Status (Mark Complete to Completed).
Delete Todo: Remove a to do item.
Authentication: Secure routes using token-based authentication.

Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js: Download Node.js
MySQL: Download MySQL
Git: Download Git

Getting Started
1. Clone the Repository
git clone <repository-url>

2. Install Dependencies
npm install

3. Set Up MySQL Database
1. Open your MySQL command-line tool or MySQL Workbench.
2. Create a new database:
    CREATE DATABASE todo-list;

3. Create Tables
. To do's Table:
    CREATE TABLE `todolist` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) 
. User's Table
    CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `auth_token` text DEFAULT NULL
) 


4. Run the application
npm run start

5. Build the Application
npm run build

6. API Endpoints
    1. Create User
    Method: POST
    Endpoint: /v1/user/createUser

    Payload:
    {
        "attributes": {
            "name": "Satya",
            "email": "satya-1@gmail.com",
            "password": "Satya@2019"
        }
    }


    2. Login
    Method: POST
    Endpoint: /v1/user/login

    Payload:
    {
        "attributes": {
            "email": "satya-1@gmail.com",
            "password": "Satya@2019"
        }
    }

    3. Add To Do
    Method: POST
    Endpont: /v1/todo/createTodo

    Header: 
    Authorization: Bearer Token

    Payload: 

    {
    "attributes": {
        "name": "Reading",
    }
    }

    4. Get the to do's User wise.
    Method: POST
    Endpoint: /v1/todo/todoListByUser

    Header: 
    Authorization: Bearer Token

    {
        "attributes": {
            "id": 7
        }
    }

    5. Update the Status of To do
    Method: PUT
    Endpoint: /v1/todo/updateMarkComplete

    Header: 
    Authorization: Bearer Token

    {
    "attributes": {
        "id": 7
    }
    }

    6. Delete the To do
    Method: DELETE
    Endpoint: /v1/todo/removeTodo/7

    Header:
    Authorization: Bearer Token

    




