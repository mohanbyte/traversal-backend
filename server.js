// Importing necessary modules
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const routes = require("./backend/routes/routes");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// MongoDB connection setup
mongoose
  .connect(
    "mongodb+srv://mohan:PmxOIHXdPVXJ1WXq@cluster0.cscwhhu.mongodb.net/backfront?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    // Improved error logging for database connection issues
    console.error("Database connection failed:", error.message);
  });

// Middleware for parsing incoming JSON requests
app.use(bodyParser.json());

// CORS headers setup to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allows all origins
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS" // Allow common HTTP methods
  );
  next(); // Move to the next middleware
});
// Enabling CORS for all routes
app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));
// Routing setup
app.use(routes);
// Setting the port for the application

const port = process.env.PORT || 3003;
// Starting the HTTP server on the defined port
app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
