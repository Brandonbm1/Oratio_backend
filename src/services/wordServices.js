import { pool } from "../db.js";
import { getOne as getCategory } from "./categoryServices.js";
export const getAll = async () => {
  try {
    const [words] = await pool.query("SELECT * FROM palabras");
    return { status: 200, words };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
export const getAllByCategory = async (searchCategory) => {
  try {
    const { category } = await getCategory(searchCategory);
    const [words] = await pool.query(
      "SELECT * FROM palabras WHERE idCategoria = ?",
      [category.id]
    );
    return { status: 200, words };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
export const getOne = async (searchWord) => {
  try {
    const [word] = await pool.query("SELECT * FROM palabras WHERE nombre = ?", [
      searchWord,
    ]);
    return { status: 200, word: word[0] };
  } catch (error) {
    return { status: 500, word: null, message: error.message };
  }
};

export const create = async (name, nameCategory, idUser) => {
  try {
    const { word } = await getOne(name);
    if (word.length > 0)
      return { status: 400, message: "Word is alredy created" };
    const { category } = await getCategory(nameCategory);
    if (!category) return { status: 400, message: "Wrong category" };
    await pool.query(
      `INSERT INTO palabras (nombre, idCategoria, idUsuarioSolicitado)
     VALUES (?,?,?)`,
      [name, category.id, idUser]
    );
    return { status: 200, message: "Word created succesfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const deleteWord = async (name) => {
  try {
    const { word } = await getOne(name);
    console.log(name);
    if (!word) return { status: 404, message: "Word not found" };
    await pool.query("DELETE FROM palabras WHERE id = ?", [word.id]);
    return { status: 204, message: "No content" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
