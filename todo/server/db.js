import pg from 'pg';
const { Pool } = pg;

const DB_USER = process.env.DB_USER;
const DB_PORT = process.env.DB_HOST;
const HOST = process.env.HOST;
const DB_PSW = process.env.DB_PSW;
const DB_NAME = process.env.DB_NAME;

export const pool = new Pool({
    user: DB_USER,
    host: HOST,
    database: DB_NAME,
    password: DB_PSW,
    port: DB_PORT,
});
