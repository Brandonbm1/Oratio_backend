import { pool } from "../db.js";
import { encryptPassword } from "../lib/helpers.js";

export const getAll = async () => {
  try {
    const [userResponse] = await pool.query(
      "SELECT id, nombre, apellido, usuario, fechaNacimiento, telefono FROM usuarios"
    );

    return {
      status: 200,
      users: userResponse,
      message: "Ok",
    };
  } catch (error) {
    return {
      status: 500,
      users: null,
      message: error.message,
    };
  }
};

export const getOne = async (id, username) => {
  /* SE PUEDE BUSCAR POR EL ID O POR LA PALABRA  */
  try {
    const [userResponse] = await pool.query(
      `SELECT id, nombre, apellido, usuario, fechaNacimiento, email, telefono 
      FROM usuarios 
      WHERE id = ? OR usuario = ?`,
      [id, username]
    );
    if (userResponse.length == 0)
      return { status: 404, user: null, message: "User not found" };
    return {
      status: 200,
      user: userResponse[0],
      message: "Ok",
    };
  } catch (error) {
    return { status: 500, user: null, message: error.message };
  }
};

export const editUser = async (id, userEdit) => {
  try {
    const { name, lastname, username, email, fechaNacimiento, phone } =
      userEdit;
    const { status, message, user } = await getOne(id);
    if (!user) return { status, user: null, message };
    const newUser = {};

    newUser["nombre"] = name ? name : user.nombre;
    newUser["apellido"] = lastname ? lastname : user.apellido;
    newUser["usuario"] = username ? username : user.usuario;
    newUser["email"] = email ? email : user.email;
    newUser["fechaNacimiento"] = fechaNacimiento
      ? fechaNacimiento
      : user.fechaNacimiento;
    newUser["telefono"] = phone ? phone : user.telefono;

    await pool.query(
      `UPDATE usuarios 
      SET ?
      WHERE id = ?`,
      [newUser, id]
    );
    return { status: 201, user: { id, data: newUser }, message: "Ok" };
  } catch (error) {
    return { status: 500, user: null, message: error.message };
  }
};

export const deleteUser = async (id) => {
  /* SE PUEDE BUSCAR POR EL ID O POR LA PALABRA  */
  try {
    const user = await getOne(id);
    if (!user.user) return { status: 404, message: "User not found" };
    pool.query("DELETE FROM usuarios WHERE id=?", [id]);
    return { status: 204, message: "User deleted succesfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const changePassword = async (id, newPassword) => {
  try {
    const [userResponse] = await pool.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [id]
    );
    if (userResponse.length == 0)
      return { status: 404, message: "User not found" };
    const encryptPass = await encryptPassword(newPassword);
    await pool.query("UPDATE usuarios SET contraseña = ? WHERE id = ?", [
      encryptPass,
      id,
    ]);

    return { status: 200, message: "Password changed succesfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export const changePhoneNumber = async (id, newPhoneNumber) => {
  try {
    const user = await getOne(id);
    if (!user) return { status: 404, message: "User not found" };
    await pool.query("UPDATE usuarios SET telefono = ? WHERE id = ?", [
      newPhoneNumber,
      id,
    ]);
    return { status: 200, message: "Phone number edit succesfully" };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};
