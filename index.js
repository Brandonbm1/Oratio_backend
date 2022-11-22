import "dotenv/config";

import express from "express";
import morgan from "morgan";
import cors from "cors";

import wordRoutes from "./src/routes/wordRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/api", wordRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server listen on port ${PORT}`);
