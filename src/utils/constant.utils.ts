import { config } from "dotenv";

config();

export const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_URL,

    JWT_SECRET_KEY,
    JWT_SECRET_KEY_REFRESH,
    PORT,
    NODE_ENV,
    CREDENTIALS,

    ADMIN_ROLE,
    CASHIER_ROLE,
    USER_ROLE,
} = process.env;
