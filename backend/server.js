import express from 'express'
import dotenv from "dotenv"
import cors from "cors";

import connectDB from "./config/db.js";
import shopownerRoute from "./routes/shopownerRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Specify your exact frontend domain
  credentials: true                // Allows cookies to pass through
}));
app.use(express.json());

app.use("/api/shopowner",shopownerRoute)

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});