import { openDb } from "../db/dbConfig.js";
import dayjs from "dayjs";

export async function createOperacoesTable(){
  try {
    const db = await openDb();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS operacoes (
        idOperacao INT AUTO_INCREMENT PRIMARY KEY,
        tipoOperacao TINYINT NOT NULL,
        idUsuario INT NOT NULL,
        idProduto INT NOT NULL,
        data DATETIME NOT NULL,
        quantidade INT NOT NULL,
        FOREIGN KEY (idUsuario) REFERENCES user(idUser) ON DELETE CASCADE,
        FOREIGN KEY (idProduto) REFERENCES produtos(idProduto) ON DELETE CASCADE
    );
    `);
    console.log("Tabela 'operações' criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela 'operacoes'", error);
  };
};



export class operacoesModel {

  static async createOperacao(idUser, idProduto, tipoOp, qtd) {
    const currentData = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const query = `
      INSERT INTO operacoes (tipoOperacao, idUsuario, idProduto, data, quantidade) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [tipoOp, idUser, idProduto, currentData, qtd];

    const db = await openDb();

    try {
      
      const [result] = await db.execute(query, values);
      return result.insertId; // Retorna o ID da operação recém-criada
    } catch (error) {
      console.error("Erro ao criar operação:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  }

  static async listAll(idProduto) {
    const query = `
      SELECT 
        op.tipoOperacao, 
        us.nome, 
        op.data, 
        op.quantidade 
      FROM operacoes op 
      INNER JOIN user us ON us.idUser = op.idUsuario 
      WHERE op.idProduto = ? 
      ORDER BY op.data DESC
    `;

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(query, [idProduto]);
      return rows;
    } catch (error) {
      console.error("Erro ao listar operações:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  }

  static async listLastTen(idCurso) {
    const query = `
      SELECT 
        op.tipoOperacao, 
        us.nome, 
        op.data, 
        op.quantidade, 
        prod.prodDescricao 
      FROM operacoes op 
      INNER JOIN user us ON us.idUser = op.idUsuario 
      INNER JOIN produtos prod ON op.idProduto = prod.idProduto 
      WHERE prod.prodCurso = ? 
      ORDER BY op.data DESC 
      LIMIT 10
    `;

    const db = await openDb();

    try {
      const [rows] = await db.execute(query, [idCurso]);
      return rows;
    } catch (error) {
      console.error("Erro ao listar últimas 10 operações:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  }

  static async relatorioOperacoes(idCurso, turma, inicio, final) {
    const query = `
      SELECT 
        prod.prodDescricao, 
        prod.prodFabricante, 
        SUM(CASE WHEN op.tipoOperacao = 1 THEN op.quantidade ELSE 0 END) AS entradas, 
        SUM(CASE WHEN op.tipoOperacao = 0 THEN op.quantidade ELSE 0 END) AS saidas 
      FROM produtos prod 
      INNER JOIN operacoes op ON prod.idProduto = op.idProduto 
      WHERE prod.prodCurso = ? 
        AND prod.prodTurma = ? 
        AND op.data BETWEEN ? AND ? 
      GROUP BY prod.prodDescricao, prod.prodFabricante 
      ORDER BY saidas DESC
    `;
    const values = [idCurso, turma, `${inicio} 00:00:00`, `${final} 23:59:59`];

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(query, values);
      return rows;
    } catch (error) {
      console.error("Erro ao gerar relatório de operações:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  }

  static async relatorioUltimosDozeMeses(idCurso) {
    const query = `
      SELECT 
        MONTH(op.data) AS mes, 
        YEAR(op.data) AS ano, 
        SUM(CASE WHEN op.tipoOperacao = 1 THEN op.quantidade ELSE 0 END) AS entradas, 
        SUM(CASE WHEN op.tipoOperacao = 0 THEN op.quantidade ELSE 0 END) AS saidas 
      FROM produtos prod 
      INNER JOIN operacoes op ON prod.idProduto = op.idProduto 
      WHERE prod.prodCurso = ? 
        AND op.data >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH) 
      GROUP BY ano, mes 
      ORDER BY ano ASC, mes ASC
    `;

    const db = await openDb();


    try {
      
      const [rows] = await db.execute(query, [idCurso]);
      return rows;
    } catch (error) {
      console.error("Erro ao gerar relatório dos últimos 12 meses:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    }
  }
}
