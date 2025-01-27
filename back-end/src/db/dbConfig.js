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

export async function createTables() {
  // const db = await openDb();
  // await db.execute(`
  //   CREATE TABLE IF NOT EXISTS user (
  //     idUser INT AUTO_INCREMENT PRIMARY KEY,
  //     nome VARCHAR(255) NOT NULL,
  //     email VARCHAR(255) NOT NULL,
  //     senha VARCHAR(255) NOT NULL,
  //     idCurso INT NOT NULL,
  //     FOREIGN KEY (idCurso) REFERENCES cursos(idCurso)
  //   );
  // `);

  // await db.execute(`
  //   CREATE TABLE IF NOT EXISTS turmas (
  //     idTurma INT AUTO_INCREMENT PRIMARY KEY,
  //     codigoTurma VARCHAR(50) NOT NULL,
  //     turnoTurma VARCHAR(50) NOT NULL,
  //     idCurso INT NOT NULL,
  //     status TINYINT NOT NULL,
  //     FOREIGN KEY (idCurso) REFERENCES cursos(idCurso)
  //   );
  // `);

  // await db.execute(`
  //   CREATE TABLE IF NOT EXISTS produtos (
  //     idProduto INT AUTO_INCREMENT PRIMARY KEY,
  //     prodDescricao VARCHAR(255) NOT NULL,
  //     prodFabricante VARCHAR(255) NOT NULL,
  //     prodQuantidade INT NOT NULL,
  //     prodValidade DATE NOT NULL,
  //     prodLote VARCHAR(255) NOT NULL,
  //     prodCurso INT NOT NULL,
  //     prodTurma INT NOT NULL,
  //     FOREIGN KEY (prodCurso) REFERENCES cursos(idCurso),
  //     FOREIGN KEY (prodTurma) REFERENCES turmas(idTurma)
  //   );
  // `);

  // await db.execute(`
  //   CREATE TABLE IF NOT EXISTS cursos (
  //     idCurso INT AUTO_INCREMENT PRIMARY KEY,
  //     nomeCurso VARCHAR(255) NOT NULL
  //   );
  // `);

  // await db.execute(`
  //   CREATE TABLE IF NOT EXISTS operacoes (
  //     idOperacao INT AUTO_INCREMENT PRIMARY KEY,
  //     tipoOperacao TINYINT NOT NULL,
  //     idUsuario INT NOT NULL,
  //     idProduto INT NOT NULL,
  //     data DATETIME NOT NULL,
  //     quantidade INT NOT NULL,
  //     FOREIGN KEY (idUsuario) REFERENCES user(idUser),
  //     FOREIGN KEY (idProduto) REFERENCES produtos(idProduto)
  //   );
  // `);
  console.log('Tabelas criadas com sucesso!');
}



// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';

// // import mysql from 'mysql2/promise';

// export async function openDb() {
//   return open({
//     filename: './database.db',
//     driver: sqlite3.Database
//   });
// }

// export async function createTables() {
//   const db = await openDb();
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS user (
//       idUser INTEGER PRIMARY KEY AUTOINCREMENT,
//       nome TEXT NOT NULL,
//       email TEXT NOT NULL,
//       senha TEXT NOT NULL,
//       idCurso INTEGER NOT NULL,
//       FOREIGN KEY (idCurso) REFERENCES cursos(idCurso)
//     );

//     CREATE TABLE IF NOT EXISTS turmas (
//       idTurma INTEGER PRIMARY KEY AUTOINCREMENT,
//       codigoTurma TEXT NOT NULL,
//       turnoTurma TEXT NOT NULL,
//       idCurso INTEGER NOT NULL,
//       status INTEGER NOT NULL,
//       FOREIGN KEY (idCurso) REFERENCES cursos(idCurso)
//     );

//     CREATE TABLE IF NOT EXISTS produtos (
//       idProduto INTEGER PRIMARY KEY AUTOINCREMENT,
//       prodDescricao TEXT NOT NULL,
//       prodFabricante TEXT NOT NULL,
//       prodQuantidade INTEGER NOT NULL,
//       prodValidade TEXT NOT NULL,
//       prodLote TEXT NOT NULL,
//       prodCurso INTEGER NOT NULL,
//       prodTurma INTEGER NOT NULL,
//       FOREIGN KEY (prodCurso) REFERENCES cursos(idCurso),
//       FOREIGN KEY (prodTurma) REFERENCES turmas(idTurma)
//     );

//     CREATE TABLE IF NOT EXISTS cursos (
//       idCurso INTEGER PRIMARY KEY AUTOINCREMENT,
//       nomeCurso TEXT NOT NULL
//     );

//     CREATE TABLE IF NOT EXISTS operacoes (
//       idOperacao INTEGER PRIMARY KEY AUTOINCREMENT,
//       tipoOperacao INTEGER NOT NULL,
//       idUsuario INTEGER NOT NULL,
//       idProduto INTEGER NOT NULL,
//       data TEXT NOT NULL,
//       quantidade INTEGER NOT NULL,
//       FOREIGN KEY (idUsuario) REFERENCES user(idUser),
//       FOREIGN KEY (idProduto) REFERENCES produtos(idProduto)
//     );
//   `);
// }
