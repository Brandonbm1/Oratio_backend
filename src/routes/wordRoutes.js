import express from "express";
import * as wordController from "../controller/wordController.js";
import * as categoryController from "../controller/categoryController.js";
import * as gifController from "../controller/gifController.js";
const app = express.Router();

app.get("/words", wordController.getAll);

app.get("/words/:name", wordController.getOne);

app.post("/words", wordController.create);

app.delete("/words/:name", wordController.deleteWord);

/* CATEGORIAS */

app.get("/categories", categoryController.getAll);

app.get("/categories/:name", categoryController.getOne);

app.post("/categories", categoryController.create);

app.put("/categories/:name", categoryController.edit);

app.delete("/categories/:name", categoryController.deleteCategory);

/* GIF */

app.get("/gif", gifController.getAll);
app.get("/gif/:word", gifController.getByWord);
app.get("/gif/count/:word", gifController.countGifsByWord);
app.post("/gif", gifController.create);
app.delete("/gif/:idGif", gifController.deleteGif);
export default app;
