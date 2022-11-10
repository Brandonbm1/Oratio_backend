import express from "express";
import * as userController from "../controller/userController.js";
const app = express.Router();

app.get("/users", userController.getAll);
app.get("/users/:idUsuario", userController.getOne);
app.delete("/users/:idUsuario", userController.deleteUser);
app.put("/users/:idUsuario", userController.editUser);
app.patch("/users/:idUsuario", userController.addPhoneNumber);

export default app;
