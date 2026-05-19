import express from 'express'
import dotenv from "dotenv"
import cors from "cors";

import connectDB from "./config/db.js";
import shopownerRoute from "./routes/shopownerRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shopowner",shopownerRoute)

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});