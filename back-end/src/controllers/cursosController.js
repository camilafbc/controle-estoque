import { CursoModel } from "../models/cursosModel.js";

export async function listCursos(req, res){

  // const idCurso = req.user.idCurso
  // console.log("Chamou o turmas e passou: " + idCurso)

  try {
    const cursos = await CursoModel.listCursos();
    return res.status(200).json(cursos);
  } catch (error){
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}

export async function countCursos(req, res){

  try {
    const cursos = await CursoModel.countCursos();
    return res.status(200).json(cursos);
  } catch (error){
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}

export async function getCursoById(req, res){
  const { id } = req.params

  try {
    const curso = await CursoModel.getCursoByID(id);
    return res.status(200).json(curso);
  } catch (error){
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}

export async function insertCurso(req, res){
  // const idCurso = req.user.idCurso;
  // console.log("idCurso = " + idCurso);
  // console.log("Chegando: ", req.body);

  // Inicializando a variável turma com os dados do body
  const { nomeCurso, status } = req.body;
  const curso = { nomeCurso, status };

  if(!curso || !curso.nomeCurso || !curso.status){
    return res.status(400).json({message: "Todos os campos são obrigatórios!"})
  }

  try {
    await CursoModel.createCurso(curso)
    res.status(201).json({message: "Curso criado com sucesso!"})
  } catch (error) {
    res.status(404).json({message: `Erro: ${error.message}`})
  }
}

export async function updateCurso(req, res){
  // Inicializando a variável turma com os dados do body
  const { idCurso, nomeCurso, status } = req.body;
  const curso = { idCurso, nomeCurso, status };
  console.log("CURSO: ", curso)

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
    res.status(404).json({message: `Erro: ${error.message}`})
  };
};

export async function deleteCurso(req, res){
  const { id } = req.params

  try {
    const delCurso = await CursoModel.deleteCurso(id)
    // console.log("DelTurma: " + delCurso)
    if(delCurso > 0){
      return res.status(200).json({message: "Curso deletado com sucesso!"})
    } else {
      return res.status(500).json({message: "Erro ao deletar curso!"})
    }
  } catch (error) {
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}