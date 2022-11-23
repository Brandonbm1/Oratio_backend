import express from "express";
import * as wordController from "../controller/wordController.js";
import * as categoryController from "../controller/categoryController.js";
import * as gifController from "../controller/gifController.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
const app = express.Router();

app.get("/words", wordController.getAll);

app.get("/words/:name", wordController.getOne);

app.post("/words", [verifyToken, isAdmin], wordController.create);

app.delete("/words/:name", [verifyToken, isAdmin], wordController.deleteWord);

/* CATEGORIAS */

app.get("/categories", categoryController.getAll);

app.get("/categories/:id", categoryController.getOne);

app.post("/categories", [verifyToken, isAdmin], categoryController.create);

app.put("/categories/:id", [verifyToken, isAdmin], categoryController.edit);

app.delete(
  "/categories/:id",
  [verifyToken, isAdmin],
  categoryController.deleteCategory
);

/* GIF */

app.get("/gif", gifController.getAll);
app.get("/gif/:word", gifController.getByWord);
app.get("/gif/count/:word", gifController.countGifsByWord);
app.post("/gif", [verifyToken, isAdmin], gifController.create);
app.delete("/gif/:idGif", [verifyToken, isAdmin], gifController.deleteGif);

export default app;
