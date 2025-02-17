import { CursoModel } from "../models/cursosModel.js";


export async function listCursos(req, res, next){

  try {
    const cursos = await CursoModel.listCursos();
    return res.status(200).json(cursos);
  } catch (error){
    next(error);
  }
};

export async function countCursos(req, res, next){

  try {
    const cursos = await CursoModel.countCursos();
    return res.status(200).json(cursos);
  } catch (error){
    next(error);
  }
};

export async function getCursoById(req, res, next){
  const { id } = req.params;

  try {
    const curso = await CursoModel.getCursoByID(id);
    return res.status(200).json(curso);
  } catch (error){
    next(error);
  }
};

export async function insertCurso(req, res, next){

  const { nomeCurso, status } = req.body;
  const curso = { nomeCurso, status };

  if(!curso || !curso.nomeCurso || !curso.status){
    return res.status(400).json({message: "Todos os campos são obrigatórios!"});
  }

  try {
    await CursoModel.createCurso(curso)
    res.status(201).json({message: "Curso criado com sucesso!"});
  } catch (error) {
    next(error);
  }
};

export async function updateCurso(req, res, next){
  const { idCurso, nomeCurso, status } = req.body;
  const curso = { idCurso, nomeCurso, status };

  if (
    typeof curso.idCurso !== "number" || 
    typeof curso.nomeCurso !== "string" || 
    typeof curso.status !== "boolean"
  ) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  try {
    const updateCurso = await CursoModel.updateCurso(curso)
    if(updateCurso > 0) res.status(200).json({message: "Curso atualizado com sucesso!!"})
      else res.status(404).json({message: `Erro ao atualizar curso`})
  } catch (error) {
    next(error);
  };
};

export async function deleteCurso(req, res, next){
  const { id } = req.params;

  try {
    const delCurso = await CursoModel.deleteCurso(id)
    // console.log("DelTurma: " + delCurso)
    if(delCurso > 0){
      return res.status(200).json({message: "Curso deletado com sucesso!"});
    } else {
      return res.status(500).json({message: "Erro ao deletar curso!"});
    }
  } catch (error) {
    next(error);
  }
};