import express from "express";
import * as userController from "../controller/userController.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";

const app = express.Router();

app.get("/users", [verifyToken, isAdmin], userController.getAll);
app.get("/users/:idUsuario", [verifyToken, isAdmin], userController.getOne);
app.delete(
  "/users/:idUsuario",
  [verifyToken, isAdmin],
  userController.deleteUser
);
app.put("/users/:idUsuario", [verifyToken], userController.editUser);
app.patch("/users/:idUsuario", [verifyToken], userController.addPhoneNumber);

export default app;
