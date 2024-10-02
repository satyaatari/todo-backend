// server.ts
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

import express, { Request, Response } from 'express';
import cors from 'cors';

import sequelize from './src/database';  // Ensure this is configured correctly
import user_router from './src/routes/user.routes';  // Ensure this file exists and exports the router
import todo_router from './src/routes/todo-routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json({ limit: "16kb" }));  // Combined JSON parsing middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));  // URL-encoded data handling
app.use(express.static("public"));  // Serve static files from the public directory

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Health check route
app.get('/health-check', (req: Request, res: Response) => {
  res.send('Server Running Successfully.!');
});

// User routes
app.use('/v1/user', user_router);  // Ensure the router is set up properly
app.use('/v1/todo', todo_router);

// Start the server
sequelize.authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }).catch((err) => {
    console.error("Mysql Connection Error ::", err);
  });
