import { openDb } from "../db/dbConfig.js";

export async function createCursosTable(){
  try {
    const db = await openDb();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS cursos (
        idCurso INT AUTO_INCREMENT PRIMARY KEY,
        nomeCurso VARCHAR(255) NOT NULL
      );
    `);
    console.log("Tabela 'cursos' criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela 'cursos'", error);
  };
};


export class CursoModel {

  static async listCursos(){
    const db = await openDb();

    try {
      const [rows] = await db.execute("SELECT * FROM cursos");
      return rows;
    } catch (error) {
      console.error("Erro ao listar cursos:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };

  };

  static async countCursos(){
    const db = await openDb();

    try {
      const [rows] = await db.execute("SELECT COUNT(*) FROM cursos WHERE status = 1");
      return rows;
    } catch (error) {
      console.error("Erro ao buscar contagem de cursos:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };

  };

  static async getCursoByID(idCurso) {

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(
        'SELECT * FROM cursos WHERE idCurso = ?', 
        [idCurso]
      );
      return rows[0]; 
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  static async createCurso(curso) {

    const db = await openDb();

    try {
      const newCurso = await db.execute(
        'INSERT INTO cursos (nomeCurso, status) VALUES (?, ?)', 
        [
          curso.nomeCurso,
          curso.status
        ]
      );
      return newCurso;
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  static async deleteCurso(idCurso){

    const db = await openDb();

    try {

      const [result] = await db.execute("DELETE FROM cursos WHERE idCurso=?", [idCurso]);
      return result.affectedRows;
     
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  static async updateCurso(curso){

    const db = await openDb();

    try {
      const [result] = await db.execute(
        'UPDATE cursos SET nomeCurso = ?, status = ? WHERE idCurso = ?', 
        [
          curso.nomeCurso,
          curso.status,
          curso.idCurso
        ]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };

  }

}