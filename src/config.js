import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.DB_CONNECT;
export const SALTROUNDS = Number(process.env.SALTROUNDS) || 10;
