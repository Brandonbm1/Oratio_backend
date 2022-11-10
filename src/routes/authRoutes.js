import express from "express";
import * as authController from "../controller/authController.js";
const app = express.Router();

app.post("/login", authController.login);

app.post("/register", authController.register);

app.patch("/password", authController.changePassword);

export default app;
