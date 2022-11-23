import { pool } from "../db.js";
import { encryptPassword, matchPassword } from "../lib/helpers.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
// import { unCodedUser } from "../middlewares/authJwt.js";

export const validateUser = async (username, email = null) => {
  try {
    const [usernameValidation] = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [username]
    );
    if (usernameValidation.length > 0) {
      return { valid: false, message: "Username is alredy taken" };
    }
    const [emailValidation] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if (emailValidation.length > 0) {
      return { valid: false, message: "Email is alredy taken" };
    }
    return { valid: true, message: "User is valid" };
  } catch (error) {
    return { valid: false, message: error.message };
  }
};

export const login = async ({ username, password }) => {
  try {
    const [response] = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [username]
    );
    if (response.length === 0) {
      return {
        status: 401,
        user: null,
        token: null,
        message: "Wrong credentials",
      };
    }
    const validPassword = await matchPassword(password, response[0].contraseña);
    if (!validPassword)
      return {
        user: null,
        status: 401,
        token: null,
        message: "Wrong credentials",
      };

    const token = jwt.sign({ id: response[0].id }, SECRET, {
      expiresIn: 86400,
    });

    const user = response[0];
    user.contraseña = "";
    return { status: 200, user: user, token, message: "Ok" };
  } catch (error) {
    return { status: 500, user: null, token: null, message: error.message };
  }
};
export const register = async (user) => {
  try {
    const {
      name,
      lastname,
      username,
      email,
      fechaNacimiento,
      phone,
      password,
      role = "USER",
    } = user;
    console.log(user);
    const { valid, message } = await validateUser(username, email);
    if (!valid) return { status: 400, token: null, message };

    const encryptPass = await encryptPassword(password);

    const [res] = await pool.query("SELECT id FROM roles WHERE nombre = ? ", [
      role,
    ]);
    const roleId = res[0].id;

    const [response] = await pool.query(
      `INSERT INTO usuarios 
      (nombre, apellido, usuario, email, fechaNacimiento, telefono, contraseña, roles_id) 
      VALUES (?,?,?,?,?,?,?, ?)`,
      [
        name,
        lastname,
        username,
        email,
        fechaNacimiento,
        phone,
        encryptPass,
        roleId,
      ]
    );
    const id = response.insertId;

    const token = jwt.sign({ id }, SECRET, {
      expiresIn: "2h",
    });
    return {
      status: 201,
      token,
      message: "User created succesfully",
    };
  } catch (error) {
    console.log(error);
    return { status: 500, token: null, message: error.message };
  }
};

export const validateAdmin = async (token) => {
  let isAdmin = false;
  try {
    const decoded = jwt.verify(token, SECRET);
    const id = decoded.id;
    const [user] = await pool.query("SELECT * FROM usuarios WHERE id= ?", [id]);
    if (!user.length > 0) return { status: 404, isAdmin };
    const roleId = user[0].roles_id;
    const [role] = await pool.query("SELECT nombre FROM roles WHERE id=?", [
      roleId,
    ]);
    if (role[0].nombre === "ADMIN") isAdmin = true;

    return { status: 200, isAdmin };
  } catch (error) {
    return { status: 500, isAdmin };
  }
};
