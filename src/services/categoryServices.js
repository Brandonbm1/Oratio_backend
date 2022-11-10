import { pool } from "../db.js";

export const getAll = async () => {
  try {
    const [categories] = await pool.query(
      "SELECT nombre FROM categorias ORDER BY id ASC"
    );
    return { status: 200, categories, message: "Ok" };
  } catch (error) {
    return { status: 500, categories: null, message: error.message };
  }
};

export const getOne = async (nombre) => {
  try {
    const [category] = await pool.query(
      "SELECT * FROM categorias WHERE nombre = ?",
      [nombre]
    );
    return { status: 200, category: category[0], message: "Ok" };
  } catch (error) {
    return { status: 500, category: null, message: error.message };
  }
};

export const create = async (nombre) => {
  try {
    const category = await getOne(nombre);
    if (!category)
      return {
        status: 400,
        category: null,
        message: "Category is alredy created",
      };
    const [categoryCreated] = await pool.query(
      "INSERT INTO categorias (nombre) VALUES(?)",
      [nombre]
    );

    return {
      status: 201,
      categoryCreated,
      message: "Category created succesfully",
    };
  } catch (error) {
    return { status: 500, category: null, message: error.message };
  }
};

export const edit = async (nombre, nombreEdit) => {
  try {
    const { category } = await getOne(nombre);
    if (category.length == 0)
      return {
        status: 404,
        category: null,
        message: "Category not found",
      };
    const [categoryEdited] = await pool.query(
      "UPDATE categorias SET nombre = ? WHERE id = ?",
      [nombreEdit, category.id]
    );

    return { status: 200, category: categoryEdited, message: "modify" };
  } catch (error) {
    return { status: 500, category: null, message: error.message };
  }
};
export const deleteCategory = async (nombre) => {
  try {
    const categoryValidate = await getOne(nombre);
    if (categoryValidate.category.length == 0)
      return {
        status: 404,
        message: "Category not found",
      };
    await pool.query("DELETE FROM categorias WHERE nombre = ?", [nombre]);
    return {
      status: 304,
      message: "No content",
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
