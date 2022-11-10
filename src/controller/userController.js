import * as userServices from "../services/userServices.js";

export const getAll = async (_req, res) => {
  const usersSearched = await userServices.getAll();
  res.status(usersSearched.status).json(usersSearched.users);
};

export const getOne = async (req, res) => {
  const { idUsuario } = req.params;
  const userSearched = await userServices.getOne(idUsuario);
  res.status(userSearched.status).json(userSearched.user);
};

export const editUser = async (req, res) => {
  const { idUsuario } = req.params;
  const { status, user } = await userServices.editUser(idUsuario, req.body);
  return res.status(status).json(user);
};

export const deleteUser = async (req, res) => {
  const { idUsuario } = req.params;
  const { status, message } = await userServices.deleteUser(idUsuario);
  return res.status(status).json({ message });
};

export const addPhoneNumber = async (req, res) => {
  const { idUsuario } = req.params;
  const { phoneNumber } = req.body;
  const { status, message } = await userServices.changePhoneNumber(
    idUsuario,
    phoneNumber
  );
  res.status(status).json({ message });
};
