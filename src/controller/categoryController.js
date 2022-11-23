import * as categoryService from "../services/categoryServices.js";

export const getAll = async (_req, res) => {
  const { status, categories } = await categoryService.getAll();

  return res.status(status).json(categories);
};

export const getOne = async (req, res) => {
  const { name } = req.params;
  const { status, category } = await categoryService.getOne(name);

  return res.status(status).json(category);
};

export const create = async (req, res) => {
  const { name } = req.body;
  const { status, message } = await categoryService.create(name);
  return res.status(status).json({ message });
};

export const edit = async (req, res) => {
  const { name } = req.params;
  const { nameEdit } = req.body;
  const { status, message } = await categoryService.edit(name, nameEdit);
  return res.status(status).json({ message });
};

export const deleteCategory = async (req, res) => {
  const { name } = req.params;
  const { status, message } = await categoryService.deleteCategory(name);
  return res.status(status).json({ message });
};
