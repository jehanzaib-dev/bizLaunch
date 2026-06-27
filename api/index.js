import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import router from "./routes/agileRoutes.js";

// Load configuration keys from the .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Enable Cross-Origin Resource Sharing (CORS) 
// This allows your React app running on localhost:5173 to safely communicate with this Express server
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

// 2. Body Parsing Middleware
// Automatically detects and parses incoming request bodies formatted as JSON strings
app.use(express.json());

app.use('/api/v1/ai', router);

// 3. System Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", message: "Express Server running cleanly." });
});

// 4. Boot Up Server Listener
app.listen(PORT, () => {
  console.log(`[Server Initialization] Backend engine successfully booted on port ${PORT}`);
});