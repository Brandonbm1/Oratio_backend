import * as wordServices from "../services/wordServices.js";

export const getAll = async (_req, res) => {
  const { status, words, message } = await wordServices.getAll();
  if (!words) return res.status(status).json(message);
  return res.status(status).json(words);
};

export const getOne = async (req, res) => {
  const { name } = req.params;
  const { status, word, message } = await wordServices.getOne(name);
  if (!word) return res.status(status).json(message);
  return res.status(status).json(word);
};

export const create = async (req, res) => {
  const { name, nameCategory, idUser } = req.body;
  const { status, message } = await wordServices.create(
    name,
    nameCategory,
    idUser
  );
  console.log(message);
  res.status(status).json({ message });
};
// export const editVideo = async (req, res) => {
//   const { word } = req.params;
//   const { video } = req.body;
//   const wordPatched = await wordServices.editVideo(word, video);
//   res.status(wordPatched.status).json(wordPatched);
// };

export const deleteWord = async (req, res) => {
  const { name } = req.params;
  const { status, message } = await wordServices.deleteWord(name);
  res.status(status).json({ message });
};
