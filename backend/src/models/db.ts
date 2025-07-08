import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // seu usuário do MySQL
  password: '', // sua senha
  database: 'market_db',
});
