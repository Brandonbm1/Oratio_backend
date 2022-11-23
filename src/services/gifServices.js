import { pool } from "../db.js";
import * as wordServices from "./wordServices.js";

export const getAll = async () => {
  try {
    const [gifResponse] = await pool.query("SELECT * FROM gif");

    return { status: 200, gifs: gifResponse, message: null };
  } catch (error) {
    return { status: 500, gifs: null, message: error.message };
  }
};

export const getByWord = async (wordForSearch) => {
  try {
    const { word } = await wordServices.getOne(wordForSearch);
    const [gifResponse] = await pool.query(
      "SELECT * FROM gif WHERE idpalabra = ?",
      [word.id]
    );
    return { status: 200, gif: gifResponse };
  } catch (error) {
    return { status: 500, gif: null, message: error.message };
  }
};

export const create = async (gif) => {
  try {
    const { description, address, idWord } = gif;
    const [gifResponse] = await pool.query(
      "INSERT INTO gif (descripcion, direccionGif, idPalabra ) VALUES (?,?,?)",
      [description, address, idWord]
    );
    console.log(gifResponse);
    return { status: 200, message: "OK" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const deleteGif = async (idGif) => {
  try {
    const { word } = await getByWord(word);
    if (!word) return { status: 404, message: "Word not found" };
    await pool.query("DELETE FROM gif WHERE id = ?", [idGif]);
    return { status: 204, message: "No content" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
export const countGifsByWord = async (wordForSearch) => {
  try {
    const { word } = await wordServices.getOne(wordForSearch);
    if (!word) return { status: 404, message: "Word not found" };
    const [gifsResponse] = await pool.query(
      "SELECT COUNT(id) as count from gif WHERE idPalabra = ?",
      [word.id]
    );
    const count = gifsResponse[0].count;
    return { status: 200, count, message: "OK" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
