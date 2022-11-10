import e from "express";
import * as rolesServices from "../services/rolesServices.js";

export const getAllRoles = async (_req, res) => {
  const { status, roles, message } = await rolesServices.getAll();
  if (message) return res.status(status).json(message);
  return res.status(status).json(roles);
};
export const getRolesByUsername = async (req, res) => {
  const { username } = req.params;
  const { status, roles, message } = await rolesServices.getRolesByUsername(
    username
  );

  if (message) return res.status(status).json(message);
  return res.status(status).json(roles);
};
export const createRole = async (req, res) => {
  const { name } = req.body;
  const { status, message } = await rolesServices.createRole(name);
  return res.status(status).json(message);
};

export const changeRole = async (req, res) => {
  const { roles } = req.body;
  const { username } = req.params;
  const { status, message } = await rolesServices.changeRole(username, roles);
  return res.status(status).json(message);
};

export const addRole = async (req, res) => {
  const { role } = req.body;
  const { idUser } = req.params;

  const { status, message } = await rolesServices.addRole(idUser, role);
  return res.status(status).json(message);
};
export const deleteRole = async (req, res) => {
  const { role } = req.body;
  const { idUser } = req.params;

  const { status, message } = await rolesServices.deleteRole(idUser, role);
  return res.status(status).json(message);
};
