import * as wordServices from "../services/wordServices.js";

export const getAll = async (_req, res) => {
  const { status, words } = await wordServices.getAll();

  return res.status(status).json(words);
};

export const getOne = async (req, res) => {
  const { name } = req.params;
  const { status, word } = await wordServices.getOne(name);

  return res.status(status).json(word);
};

export const create = async (req, res) => {
  const { name, nameCategory, idUser } = req.body;
  const { status, message } = await wordServices.create(
    name,
    nameCategory,
    idUser
  );

  res.status(status).json(message);
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
  res.status(status).json(message);
};
