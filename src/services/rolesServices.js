import { pool } from "../db.js";
import { getOne } from "./userServices.js";
export const getAll = async () => {
  try {
    const [result] = await pool.query(`SELECT * FROM roles`);
    if (result.length == 0) return { status: 204, message: "No content" };
    return { status: 200, roles: result };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
const getRoleId = async (name) => {
  try {
    const [result] = await pool.query(`SELECT id FROM roles WHERE nombre = ?`, [
      name,
    ]);
    return result[0].id;
  } catch (error) {
    return null;
  }
};
export const getRolesByUsername = async (username) => {
  try {
    const { user } = await getOne(null, username);
    if (!user) return { status: 404, message: "Usuario no encontrado" };

    const [result] = await pool.query(
      `
      SELECT roles.nombre FROM usuarios_has_roles 
      INNER JOIN usuarios ON usuarios_has_roles.usuarios_idusuarios = usuarios.id
      INNER JOIN roles ON usuarios_has_roles.role_idrole = roles.id
      WHERE usuarios.usuario = ?
      `,
      [username]
    );
    const roles = [];

    result.forEach((role) => roles.push(role.nombre));

    return { status: 200, roles };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
export const createRole = async (name) => {
  try {
    await pool.query(`INSERT INTO roles (nombre) VALUES (?)`, [name]);
    return { status: 201, message: "Role created succesfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const changeRole = async (username, newRoles) => {
  try {
    const { user } = await getOne(null, username);
    const { roles } = await getRolesByUsername(user.usuario);

    roles.forEach(async (role) => {
      await pool.query(
        `DELETE FROM usuarios_has_roles 
        WHERE usuarios.ususario = ?`,
        [user.id]
      );
    });

    newRoles.forEach(async (role) => {
      const idRole = await getRoleId(role);
      await pool.query(
        `INSERT INTO usuarios_has_roles (usuarios_idusuarios, role_idrole) VALUES (?, ?)`,
        [user.id, idRole]
      );
    });
    return { status: 200, message: "Updated succesfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
export const deleteRole = async (idUser, role) => {
  try {
    const roleId = await getRoleId(role);
    await pool.query(
      `DELETE FROM usuarios_has_roles 
    WHERE usuarios_idusuarios = ? AND role_idrole = ?`,
      [idUser, roleId]
    );
    return { status: 200, message: "Updated succesfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
export const addRole = async (idUser, role) => {
  try {
    const roleId = await getRoleId(role);
    await pool.query(
      `INSERT INTO usuarios_has_roles (usuarios_idusuarios, role_idrole) VALUES (?,?)`,
      [idUser, roleId]
    );
    return { status: 200, message: "Updated succesfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
