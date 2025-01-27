import mysql from 'mysql2/promise';

export async function openDb() {
  const connection = await mysql.createConnection(process.env.MYSQL_URL);
  return connection;
}

// export async function createTables

