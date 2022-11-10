import { pool } from "../db.js";
import { encryptPassword, matchPassword } from "../lib/helpers.js";
import jwt from "jsonwebtoken";
import { unCodedUser } from "../middlewares/authJwt.js";

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

export const login = async (credentials) => {
  try {
    const { username, password } = credentials;
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

    const token = jwt.sign({ id: response[0].id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    const [user] = await unCodedUser(token);

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
      roles,
    } = user;

    if (!roles) roles = ["USER"];

    const { valid, message } = await validateUser(username, email);
    if (!valid) return { status: 400, token: null, message };

    const encryptPass = await encryptPassword(password);

    const validRolesIds = [];
    roles.forEach(async (role) => {
      const [res] = await pool.query("SELECT * FROM roles WHERE nombre = ?", [
        role,
      ]);
      if (res.length > 0) validRolesIds.push(res[0].id);
      console.log(validRolesIds);
    });
    // if (validRolesIds.length === 0)
    //   return { status: 403, token: null, message: "Invalid roles" };

    const [response] = await pool.query(
      `INSERT INTO usuarios 
      (nombre, apellido, usuario, email, fechaNacimiento, telefono, contraseña) 
      VALUES (?,?,?,?,?,?,?)`,
      [name, lastname, username, email, fechaNacimiento, phone, encryptPass]
    );
    const id = response.insertId;

    validRolesIds.forEach(async (validRole) => {
      await pool.query(
        `INSERT INTO usuarios_has_roles 
      (usuarios_idusuarios, role_idrole) 
      VALUES (?, ?)`,
        [id, validRole]
      );
    });

    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 86400,
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
