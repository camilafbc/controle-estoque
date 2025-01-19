import { openDb } from "../db/dbConfig.js";
import bcrypt from "bcrypt";

export async function createUserTable(){
  try {
    const db = await openDb();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS user (
        idUser INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(50) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        idCurso INT DEFAULT NULL,
        role ENUM('admin', 'user') NOT NULL,
        FOREIGN KEY (idCurso) REFERENCES cursos(idCurso)
      );
    `);
    console.log("Tablea 'User' criada co sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela 'user'", error)
  };
};

export class userModel {

  static async listUsers(){
    const db = await openDb();

    try {
      
      const [users] = await db.execute("SELECT * FROM user WHERE user.role = 'user'");
      return users;
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };
  
  static async createUser(user) {

    const db = await openDb();

    try {
      
      const [newUser] = await db.execute(
        'INSERT INTO user (nome, email, senha, idCurso, role) VALUES (?, ?, ?, ?, ?)', 
        [
          user.nome, 
          user.email, 
          bcrypt.hashSync(user.senha, 10), 
          user.idCurso,
          user.role
        ]
      );
      return newUser;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  static async getUserById(id) {

    const db = await openDb();

    try {
      
      const [user] = await db.execute(
        'SELECT * FROM user u LEFT JOIN cursos c ON u.idCurso = c.idCurso WHERE u.idUser = ?',
        [id]
      );
      return user[0];
    } catch (error) {
      console.error("Erro ao buscar usuário pelo id:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  static async findUserByEmail(email) {
    const db = await openDb();

    try {
      const [user] = await db.execute(
        'SELECT idUser FROM user WHERE email = ?', 
        [email]
      );
      console.log("USER: ", user[0])
      return user[0];
    } catch (error) {
      console.error("Erro ao encontrar usuário:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  // static async getAllUsers() {

  //   const db = await openDb();

  //   try {
      
  //     const [rows] = await db.execute('SELECT * FROM user');
  //     return rows;
  //   } catch (error) {
  //     console.error("Erro ao criar listar usuários:", error);
  //     throw error;
  //   } finally {
  //     if(db){
  //       await db.end();
  //     }
  //   };
  // };

  static async deleteUser(id) {

    const db = await openDb();

    try {
      const [result] = await db.execute(
        'DELETE FROM user WHERE idUser = ?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  // static async updateUser(user) {

  //   const db = await openDb();

  //   try {
      
  //     const [result] = await db.execute(
  //       'UPDATE user SET nome = ?, email = ?, senha = ?, idCurso = ?', 
  //       [
  //         user.nome, 
  //         user.email, 
  //         bcrypt.hashSync(user.senha, 10), 
  //         user.idCurso
  //       ]
  //     );
  //     return result.affectedRows;
  //   } catch (error) {
  //     console.error("Erro ao atualizar usuário:", error);
  //     throw error;
  //   } finally {
  //     if(db){
  //       await db.end();
  //     }
  //   };
  // };

  static async updateUser(user, senhaHash) {
    const db = await openDb();
  
    try {
      const sqlParams = [
        user.nome,
        user.email,
      ];
  
      let result = { affectedRows: 0 };
  
      // Se a senha for fornecida, inclui no SQL
      if (senhaHash) {
        sqlParams.push(senhaHash);
        sqlParams.push(user.idUser); // ID do usuário para o update
        const [rows] = await db.execute(
          'UPDATE user SET nome = ?, email = ?, senha = ? WHERE idUser = ?',
          sqlParams
        );
        result = rows; // Aqui, você armazena o resultado da consulta
      } else {
        sqlParams.push(user.idUser); // ID do usuário para o update
        const [rows] = await db.execute(
          'UPDATE user SET nome = ?, email = ? WHERE idUser = ?',
          sqlParams
        );
        result = rows; // Aqui, você armazena o resultado da consulta
      }
  
      return result.affectedRows; // Retorna a quantidade de linhas afetadas
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    } finally {
      if (db) {
        await db.end();
      }
    }
  }
  

};
