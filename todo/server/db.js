import pg from 'pg';
const { Pool } = pg;

const PGUSER = process.env.DB_USER;
const PGPORT = process.env.PGPORT;
const PGHOST = process.env.PGHOST;
const PGPASSWORD = process.env.DB_PSW;
const PGDATABASE = process.env.DB_NAME;

export const pool = new Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
});
