# Project Name:
Design and Implementation of a Lost and Found Management System for Institutional Environments - Backend

# Project Overview:
The point of this project is to make a web-based system that makes it simple for people to report, track, and get back things they have lost. It is focused on coming up with answers to problems that happen in real life, like in schools, businesses, and homes. The system will use a digital platform instead of manual methods, which will make it more likely that lost items will be returned to their rightful owners.

# Project Workflow:
1.	People sign up for the system and then log in. 
2.	Users tell the site about things they lost, including the name, description, location, and date.
3.	Users say what they found 
4.	The database stores all of the system's information. 
5.	The user can see all the items that were found and find the one they lost. 
6.	Users file claims for things 
7.	The admin checks the item and gives the go-ahead for its return. 
8.	The system keeps track of changes and keeps records.


# Technologies Used:
The system will be built using a modern full-stack JavaScript architecture to ensure that it can grow, work well, and be simple to maintain. <br>

* Frontend: The frontend will be made with Next.js. This framework allows for fast routing and server-side rendering. It will handle the user interfaces for filing claims, reporting items, and searching for them. <br>
* Backend: The backend will be built using NestJS, a Node.js framework that can grow. Through RESTful APIs, it will take care of business logic, authentication, and system operations. <br>
* Database: MongoDB, a flexible NoSQL database that can hold both item records and user data, will be used by the system. <br>
* Deployment: Vercel will be used to deploy the app, which makes it easy to do so quickly, scale it, and keep it up to date. <br>
* Development Tools: TypeScript and Node.js will be used to make sure that the code runs quickly and that types are safe. <br>

# Expected Outcome:

The system will make it simple and helpful to keep track of things that have been lost and found. It will help you find more things, do less work by hand, and be useful in the real world.

# API Endpoints

| Method | Endpoint        | Description                       |
| ------ | --------------- | --------------------------------- |
| POST   | `/api/register` | Register a new user               |
| POST   | `/api/login`    | User login authentication         |
| GET    | `/api/profile`  | Retrieve user profile information |

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| POST   | `/api/report-lost`  | Submit a lost item report          |
| POST   | `/api/report-found` | Submit a found item report         |
| GET    | `/api/items`        | Retrieve all reported items        |
| GET    | `/api/matches`      | Retrieve AI-based matching results |
| DELETE | `/api/items/:id`    | Delete an item record              |

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| GET    | `/api/health`  | Check backend API status   |
| GET    | `/api/test-db` | Verify database connection |


# Database

The project uses MongoDB as the primary database system for storing and managing application data.

## Database Features
User account management <br>
Lost item records <br>
Found item records <br>
Matching result storage <br>
Authentication data handling <br>

## Technologies Used
MongoDB <br>
Mongoose ODM <br>
NestJS database integration <br>

## Sample Collections
users <br>
lost_items <br>
found_items <br>
matches <br>

# AI Component

The system includes a basic AI-based matching component to improve the accuracy of identifying related lost and found items.<br>

## AI Features
Text similarity comparison<br>
Keyword-based matching<br>
Item description comparison<br>
Intelligent matching suggestions<br>

## AI Technologies Used
Python<br>
Text similarity algorithms<br>
difflib library (or similar matching libraries)<br>


## AI Workflow
User submits lost or found item<br>
System compares item descriptions<br>
Similarity score is generated<br>
Potential matches are displayed to the user<br>

# Installation

## Prerequisites

Before running the project, ensure the following are installed:

Node.js
npm
MongoDB
Git

## Clone Repository
git clone https://github.com/your-repository/project-name.git
Install Frontend Dependencies
cd frontend
npm install
Install Backend Dependencies
cd backend
npm install

## Configure Environment Variables

Create a .env file and add:

BACKEND_API=http://localhost:5000
FRONTEND_API=http://localhost:3000
API_URL=http://localhost:5000
AUTH_URL=http://localhost:3000
Run Frontend
npm run dev

## Frontend runs on:

http://localhost:3000
Run Backend
npm run start

## Backend runs on:

http://localhost:5000
Run MongoDB

Ensure MongoDB service is running locally before starting the backend server.

# Team Info

## Group 06: <br>

| No | Student Name | Student ID|
|------|--------|------------|
01	|Lutful Hassan Fahim|	12268790|
02  |Md Raqibur Rahman Roni	|12279329
03	|Aman Sharma |	12299445
04	|Gihani Shanika De Silva Balage Don |	12267157




