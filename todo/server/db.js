import pg from 'pg';
const { Pool } = pg;

const PGUSER = process.env.PGUSER;
const PGPORT = process.env.PGPORT;
const PGHOST = process.env.PGHOST;
const PGPASSWORD = process.env.PGPASSWORD;
const PGDATABASE = process.env.PGDATABASE;

export const pool = new Pool({
    user: PGUSER,
    host: PGHOST || 'localhost',
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT || 5432,
});
