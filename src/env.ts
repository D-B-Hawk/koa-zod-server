import dotenv from "dotenv";

const { SERVER_PORT } = process.env;

export const serverPort = SERVER_PORT ? +SERVER_PORT : 3000;
