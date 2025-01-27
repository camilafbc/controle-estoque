import mysql from 'mysql2/promise';

export async function openDb() {
  // Substitua pelos seus dados de conexão MySQL
  const connection = await mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
  });
  return connection;
}