import { openDb } from "../db/dbConfig.js";

export async function createTurmasTable(){
  try {
    const db = await openDb();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS turmas (
        idTurma INT AUTO_INCREMENT PRIMARY KEY,
        codigoTurma VARCHAR(50) NOT NULL UNIQUE,
        turnoTurma VARCHAR(50) NOT NULL,
        idCurso INT NOT NULL,
        status TINYINT NOT NULL,
        FOREIGN KEY (idCurso) REFERENCES cursos(idCurso)
      );
    `);
    console.log("Tabela 'Turmas' criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela 'turmas'", error)
  };
};

export class turmasModel {
  
  static async createTurma(turma) {

    const db = await openDb();

    try {
      
      const turmaCriada = await db.execute(
        'INSERT INTO turmas (codigoTurma, turnoTurma, idCurso, status) VALUES (?, ?, ?, ?)', 
        [
          turma.codigo,
          turma.turno,
          turma.idCurso,
          turma.status
        ]
      );
      return turmaCriada;
    } catch (error) {
      console.error("Erro ao criar turma:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  static async getTurmasByCurso(idCurso) {

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(
        'SELECT * FROM turmas WHERE idCurso = ? ORDER BY codigoTurma', 
        [idCurso]
      );
      return rows;
    } catch (error) {
      console.error("Erro ao buscar turmas por curso:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  static async getTurmasByID(idTurma) {

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(
        'SELECT * FROM turmas WHERE idTurma = ?', 
        [idTurma]
      );
      return rows.length > 0 ? rows[0] : null; 
    } catch (error) {
      console.error("Erro ao buscar turma:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  static async updateTurma(turma) {

    const db = await openDb();

    try {
      
      const [result] = await db.execute(
        'UPDATE turmas SET codigoTurma = ?, turnoTurma = ?, status = ? WHERE idTurma = ?', 
        [
          turma.codigo,
          turma.turno,
          turma.status,
          turma.idTurma
        ]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Erro ao atualizar turma:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };

  static async deleteTurma(idTurma) {

    const db = await openDb();

    try {
      
      const [result] = await db.execute(
        'DELETE FROM turmas WHERE idTurma = ?', 
        [idTurma]
      );
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

  static async getCountTurmas(idCurso) {

    const db = await openDb();

    try {
      
      const [rows] = await db.execute(
        'SELECT COUNT(*) AS count FROM turmas WHERE idCurso = ? AND status = 1', 
        [idCurso]
      );
      return rows.length > 0 ? rows[0] : { count: 0 };
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    } finally {
      if(db){
        await db.end();
      }
    };
  };
}



// import { openDb } from "../db/dbConfig.js";

// export class turmasModel {

//   static async createTurma(turma){
//     const db = await openDb();
//     await db.run('INSERT INTO turmas (codigoTurma, turnoTurma, idCurso, status) VALUES (?, ?, ?, ?)', [
//       turma.codigo,
//       turma.turno,
//       turma.idCurso,
//       turma.status
//      ])
//   }

//   static async getTurmasByCurso(idCurso) {
//     const db = await openDb();
//     const turmas = await db.all('SELECT * FROM turmas WHERE turmas.idCurso = ? ORDER BY codigoTurma', [idCurso]);
//     return turmas;
//   }

//   static async getTurmasByID(idTurma) {
//     const db = await openDb();
//     const turma = await db.get('SELECT * FROM turmas WHERE turmas.idTurma = ? ', [idTurma]);
//     console.log("Chamou turma: " + turma)
//     return turma;
//   }

//   static async updateTurma(turma){
//     const db = await openDb();
//     const updateTurma = await db.run('UPDATE turmas SET codigoTurma=?, turnoTurma=?, status=? WHERE idTurma=?', [
//       turma.codigo,
//       turma.turno,
//       turma.status,
//       turma.idTurma
//     ]);
//     return updateTurma.changes
//   }

//   static async deleteTurma(idTurma) {
//     const db = await openDb();
//     const turma = await db.run('DELETE FROM turmas WHERE turmas.idTurma = ?', [idTurma]);
//     return turma.changes;
//   }

//   static async getCountTurmas(idCurso) {
//     const db = await openDb();
//     const turmas = await db.get('SELECT COUNT(*) AS count FROM turmas WHERE turmas.idCurso = ? AND turmas.status = 1', [idCurso]);
//     return turmas;
//   }

// }