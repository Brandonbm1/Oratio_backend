import * as gifServices from "../services/gifServices.js";

export const getAll = async (_req, res) => {
  const { status, gifs } = await gifServices.getAll();

  return res.status(status).json(gifs);
};

export const getByWord = async (req, res) => {
  const { word } = req.params;
  const { status, gif } = await gifServices.getByWord(word);
  return res.status(status).json(gif);
};

export const create = async (req, res) => {
  const { status, message } = await gifServices.create(req.body);
  return res.status(status).json({ message });
};
export const deleteGif = async (req, res) => {
  const { idGif } = req.params;
  const { status, message } = await gifServices.deleteGif(idGif);
  return res.status(status).json({ message });
};
export const countGifsByWord = async (req, res) => {
  const { word } = req.params;
  const { status, message, count } = await gifServices.countGifsByWord(word);
  return res.status(status).json({ count, message });
};
