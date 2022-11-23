import { createPool } from "mysql2/promise";
import { HOST, PORTDB, USER, PASSWORD, DATABASE } from "./config.js";

export const pool = createPool({
  host: HOST,
  port: PORTDB,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});
