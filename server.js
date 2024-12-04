// Importing necessary packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import multer from "multer";
import projectRoutes from "./routes/projectRoutes.js";
import connectDb from "./config/db.js";

// Load environment variables
dotenv.config();

// Using express
const app = express();

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON
app.use(bodyParser.urlencoded({ extended: true })); // For parsing URL-encoded data
app.use(cors());

// File upload setup using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Dummy route for base URL
app.get("/", (req, res) => {
  res.send("Welcome to our Personal Website Backend! 🚀");
});

// API routes for projects
app.use("/api/projects", projectRoutes);

// Initializing port and starting the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server started on port ${port} and running`);
});
