import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;
export const HOST = process.env.HOST;
export const PORTDB = process.env.PORTDB;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
