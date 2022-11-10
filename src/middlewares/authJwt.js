import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export const unCodedUser = async (token) => {
  try {
    if (!token) return { message: "No token provider" };
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;
    const [user] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      userId,
    ]);
    if (!user.length > 0) return { message: "No user found" };
    user[0].contraseña = "";
    return user;
  } catch (error) {
    return { message: "Unauthorized" };
  }
};
