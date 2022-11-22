import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.status(400).json({ message: "No token provider" });

    const decoded = jwt.verify(token, process.env.SECRET);

    req.userId = decoded.id;

    const [user] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      req.userId,
    ]);

    if (!user.length > 0)
      return res.status(404).json({ message: "User not found" });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const [user] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      req.userId,
    ]);
    const [role] = await pool.query("SELECT * FROM roles WHERE id = ?", [
      user[0].roles_id,
    ]);
    if (role[0].nombre === "ADMIN") {
      next();
      return;
    }
    return res.status(403).json({ message: "Require admin role" });
  } catch (error) {}
};
