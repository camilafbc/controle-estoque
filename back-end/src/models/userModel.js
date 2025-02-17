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
    // await db.execute("INSERT INTO user (nome, email, senha, role, idCurso, created_by) VALUES ('MASTER', 'user@email.com', '$2b$10$KmMBfIkGH2Rwb0KI6k5WYeII8Lr1IfKSHyW30WE5vwxtyapk/0KWm', 'admin', NULL, 1)")
  } catch (error) {
    console.error("Erro ao criar tabela 'user'", error)
  };
};

export class userModel {

  static async listUsers(){
    const db = await openDb();

    try {
      
      const [users] = await db.execute("SELECT u.idUser, u.nome, u.email, u.role, u.status, c.idCurso, c.nomeCurso FROM user u LEFT JOIN cursos c ON u.idCurso = c.idCurso WHERE u.idUser != 1");
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

  static async countUsers(){
    const db = await openDb();

    try {
      const [rows] = await db.execute("SELECT COUNT(*) AS count FROM user WHERE status = 1");
      return rows[0];
    } catch (error) {
      console.error("Erro ao buscar contagem de usuários:", error);
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
        'INSERT INTO user (nome, email, senha, idCurso, role, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          user.nome, 
          user.email, 
          bcrypt.hashSync(user.senha, 10), 
          user.idCurso,
          user.role,
          user.status,
          user.created_by
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
        'SELECT u.idUser, u.nome, u.email, u.senha, u.role, u.status, u.idCurso, c.nomeCurso FROM user u LEFT JOIN cursos c ON u.idCurso = c.idCurso WHERE u.idUser = ?',
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
            user.status,
            user.role
        ];
        
        let sqlQuery = 'UPDATE user SET nome = ?, email = ?, status = ?, role = ?';

        // Se a senha for fornecida, adiciona ao SQL
        if (senhaHash) {
            sqlQuery += ', senha = ?';
            sqlParams.push(senhaHash);
        }

        // Se o usuário NÃO for admin, adiciona o idCurso
        if (user.role === "user" && user.idCurso) {
            sqlQuery += ', idCurso = ?';
            sqlParams.push(user.idCurso);
        }

        // Adiciona a cláusula WHERE e o idUser
        sqlQuery += ' WHERE idUser = ?';
        sqlParams.push(user.idUser);

        // Executa a query
        const [rows] = await db.execute(sqlQuery, sqlParams);
        return rows.affectedRows;

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;
    } finally {
        if (db) {
            await db.end();
        }
    }
  };
  

};
