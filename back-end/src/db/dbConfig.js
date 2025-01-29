import mysql from 'mysql2/promise';

export async function openDb() {
  // Substitua pelos seus dados de conexão MySQL
  const connection = await mysql.createConnection(process.env.MYSQL_URL);
  return connection;
}