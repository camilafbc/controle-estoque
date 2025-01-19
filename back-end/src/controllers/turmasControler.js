import { turmasModel } from "../models/turmasModel.js";

export async function listTurmas(req, res){

  // const { idCurso }= req.body
  // const {id} = req.params
  const idCurso = req.user.idCurso
  console.log("Chamou o turmas e passou: " + idCurso)

  try {
    const turmas = await turmasModel.getTurmasByCurso(idCurso);
    return res.status(200).json(turmas);
  } catch (error){
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}

export async function getTurma(req, res){
  const { id } = req.params

  try {
    const turma = await turmasModel.getTurmasByID(id)
    return res.status(200).json(turma);
  } catch (error){
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}

export async function inserTurma(req, res){
  const idCurso = req.user.idCurso;
  console.log("idCurso = " + idCurso);
  console.log("Chegando: ", req.body);

  // Inicializando a variável turma com os dados do body
  const { codigo, turno, status } = req.body;
  const turma = {
    codigo,
    turno,
    status,
    idCurso,
  };

  if(!turma || !turma.codigo || !turma.turno || !turma.idCurso){
    return res.status(400).json({message: "Todos os campos são obrigatórios!"})
  }

  try {
    await turmasModel.createTurma(turma)
    res.status(201).json({message: "Turma cadastrada!"})
  } catch (error) {
    res.status(404).json({message: `Erro: ${error.message}`})
  }
}

export async function updateTurma(req, res){
  // Inicializando a variável turma com os dados do body
  const { codigo, turno, status, idTurma } = req.body;
  const turma = {
    codigo,
    turno,
    status,
    idTurma
  };

  if(!turma || !turma.codigo || !turma.turno || !turma.idTurma){
    return res.status(400).json({message: "Todos os campos são obrigatórios!"})
  }

  try {
    const updateTurma = await turmasModel.updateTurma(turma)
    if(updateTurma > 0) res.status(200).json({message: "Turma atualizada!"})
      else res.status(404).json({message: `Erro ao atualizar turma`})
  } catch (error) {
    res.status(404).json({message: `Erro: ${error.message}`})
  }
}

export async function deleteTurma(req, res){
  const { id } = req.params

  try {
    const delTurma = await turmasModel.deleteTurma(id)
    console.log("DelTurma: " + delTurma)
    if(delTurma > 0){
      return res.status(200).json({message: "Turma deletada com sucesso!"})
    } else {
      return res.status(500).json({message: "Erro ao deletar turma!"})
    }
  } catch (error) {
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}