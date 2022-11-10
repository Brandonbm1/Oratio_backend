import express from "express";
import * as rolesController from "../controller/rolesController.js";

const app = express.Router();

app.get("/roles", rolesController.getAllRoles);
app.get("/roles/:username", rolesController.getRolesByUsername);
app.post("/roles", rolesController.createRole);
app.put("/roles/:idUser", rolesController.addRole);
app.delete("/roles/:idUser", rolesController.deleteRole);

export default app;
