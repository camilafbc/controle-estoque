import { openDb } from "../db/dbConfig.js";
import bcrypt from "bcrypt";

export async function createUserTable(){
  try {
    const db = await openDb();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS user (
      idUser INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,             
      senha VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',                    
      idCurso INT DEFAULT NULL,  
      status BOOLEAN DEFAULT TRUE,                         
      created_by INT NOT NULL,                        
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);
    console.log("Tablea 'User' criada com sucesso!");
    await db.execute("INSERT INTO user (nome, email, senha, role, idCurso, created_by) VALUES ('MASTER', 'user@email.com', '$2b$10$KmMBfIkGH2Rwb0KI6k5WYeII8Lr1IfKSHyW30WE5vwxtyapk/0KWm', 'admin', NULL, 1)")
  } catch (error) {
    console.error("Erro ao criar tabela 'user'", error)
  };
};

export class userModel {

  static async listUsers(){
    const db = await openDb();

    try {
      
      const [users] = await db.execute("SELECT u.idUser, u.nome, u.email, u.role, u.status, c.nomeCurso AS curso FROM user u LEFT JOIN cursos c ON u.idCurso = c.idCurso WHERE u.idUser != 1 AND u.role = 'user' ");
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
        sqlParams.push(user.idUser); 
        const [rows] = await db.execute(
          'UPDATE user SET nome = ?, email = ?, senha = ? WHERE idUser = ?',
          sqlParams
        );
        result = rows; 
      } else {
        sqlParams.push(user.idUser); 
        const [rows] = await db.execute(
          'UPDATE user SET nome = ?, email = ? WHERE idUser = ?',
          sqlParams
        );
        result = rows; 
      }
  
      return result.affectedRows; 
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
