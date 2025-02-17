import { openDb } from "../db/dbConfig.js";

export async function createProdutosTable(){
  try {
    const db = await openDb();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS produtos (
        idProduto INT AUTO_INCREMENT PRIMARY KEY,
        prodDescricao VARCHAR(255) NOT NULL UNIQUE,
        prodFabricante VARCHAR(255) NOT NULL,
        prodQuantidade INT NOT NULL,
        prodValidade DATE NOT NULL,
        prodLote VARCHAR(255) NOT NULL,
        prodCurso INT NOT NULL,
        prodTurma INT NOT NULL,
        FOREIGN KEY (prodCurso) REFERENCES cursos(idCurso),
        FOREIGN KEY (prodTurma) REFERENCES turmas(idTurma)
      );
    `);
    console.log("Tabela 'produtos criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela 'produtos", error);
  };
};

export class productModel {

  static async createProduct(product) {

    const db = await openDb();
    
    try {
      
      const [result] = await db.execute(
        'INSERT INTO produtos (prodDescricao, prodFabricante, prodQuantidade, prodValidade, prodLote, prodCurso, prodTurma) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [
          product.prodDescricao,
          product.prodFabricante,
          product.prodQuantidade,
          product.prodValidade,
          product.prodLote,
          product.prodCurso,
          product.prodTurma
        ]
      );
      // Retorna o ID do produto recém-criado
      return { idProduto: result.insertId };
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };

  static async getProductById(id) {

    const db = await openDb();

    try {
      
      const [row] = await db.execute(
        'SELECT * FROM produtos WHERE idProduto = ?', 
        [id]
      );
      return row[0]; 
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };

  static async searchProduct(produto, curso, turma) {

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(
        'SELECT * FROM produtos WHERE prodDescricao LIKE ? AND prodCurso = ? AND prodTurma = ? ORDER BY prodDescricao', 
        [`%${produto}%`, curso, turma]
      );
      return rows;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };

  static async listAllProducts(curso, turma) {

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(
        'SELECT * FROM produtos WHERE prodCurso = ? AND prodTurma = ?', 
        [curso, turma]
      );
      return rows; 
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };

  static async countProducts(curso) {

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(
        'SELECT COUNT(*) AS count FROM produtos WHERE prodCurso = ?', 
        [curso]
      );
      return rows[0];
    } catch (error) {
      console.error("Erro ao buscar quantidade de produtos:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };

  static async deleteProduct(id) {

    const db = await openDb();

    try {
      
      const [result] = await db.execute(
        'DELETE FROM produtos WHERE idProduto = ?', 
        [id]
      );
      // console.log(result.affectedRows);
      return result.affectedRows;
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };

  static async updateProduct(product) {

    const db = await openDb();

    try {
      
      const [result] = await db.execute(
        'UPDATE produtos SET prodDescricao = ?, prodFabricante = ?, prodQuantidade = ?, prodValidade = ?, prodLote = ?, prodCurso = ?, prodTurma = ? WHERE idProduto = ?', 
        [
          product.prodDescricao,
          product.prodFabricante,
          product.prodQuantidade,
          product.prodValidade,
          product.prodLote,
          product.prodCurso,
          product.prodTurma,
          product.idProduto
        ]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };

  static async updateProductQuantity(id, quantidade) {

    const db = await openDb();

    try {
      
      const [result] = await db.execute(
        'UPDATE produtos SET prodQuantidade = ? WHERE idProduto = ?', 
        [quantidade, id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Erro ao atualizar quantidade do produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };

  static async getExpiringProducts(curso) {

    const db = await openDb();

    try {
      // console.log("Chamou o getExpiringProducts");
      
      const [rows] = await db.execute(
        `SELECT * FROM produtos 
        WHERE prodCurso = ? AND prodValidade <= DATE_ADD(CURDATE(), INTERVAL 30 DAY) 
        ORDER BY prodValidade ASC`, 
        [curso]
      );
      // console.log("Pegou: ", rows);
      return rows; 
    } catch (error) {
      console.error("Erro ao buscar produtos a expirar:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };

  static async totalEstoque(curso) {

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(
        'SELECT SUM(prodQuantidade) AS totalEstoque FROM produtos WHERE prodCurso = ?', 
        [curso]
      );
      return rows[0]; 
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  };
}
