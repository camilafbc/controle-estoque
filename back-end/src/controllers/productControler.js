import { operacoesModel } from "../models/operacoesModel.js";
import { productModel } from "../models/productModel.js";

// POST /produtos
export async function insertProduct(req, res){

  // console.log(req.body)
  // console.log("User autenticado: " + req.user.idUser)

  const {product} = req.body
  const idUser = req.user.idUser;
  const idCurso = req.user.idCurso
  product.prodCurso = idCurso
  // console.log("Testando user: " + teste)

  // console.log('debugando product: ', product.prodDescricao)
  // console.log('debugando product: ', product.prodFabricante)
  // console.log('debugando product: ', product.prodQuantidade)
  // console.log('debugando product: ', product.prodValidade)
  // console.log('debugando product: ', product.prodLote)
  // console.log('debugando product: ', product.prodCurso)
  // console.log('debugando product: ', product.prodTurma)

  if(!product || !product.prodDescricao || !product.prodFabricante || !product.prodQuantidade || !product.prodValidade || !product.prodLote || !product.prodCurso || !product.prodTurma){
    return res.status(400).json({message: "Todos os campos são obrigatórios"})
  }

  try {

    const newProductId = await productModel.createProduct(product);
    console.log("Pegando Id: " + newProductId)
    await operacoesModel.createOperacao(idUser, newProductId.idProduto, 1, product.prodQuantidade);
    return res.status(201).json({message: "Dados criados com sucesso!"})

  } catch (error) {
    return res.status(400).json({message: `Erro no catch: ${error.message}`})
  }

}

// GET /produtos/list/:turma
export async function listProducts(req, res){
  const { turma } = req.params
  // res.status(200).json({message: `Chegou: ${curso} e ${turma}`})
  const curso = req.user.idCurso

  if(!curso || !turma){
    return res.status(400).json({message: "Parâmetros curso e turma ausentes."})
  }

  try {
    const list = await productModel.listAllProducts(curso, turma)
    return res.status(200).json(list)
  } catch (error) {
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}

// GET /produtos/:id
export async function selectProduct(req, res){
  const { id } = req.params
  console.log("QUer o produto: " + id)
  if(!id){
    return res.status(400).json({message: "Parâmetro 'id' ausente."})
  }

  try {
    const product = await productModel.getProductById(id)
    return res.status(200).json(product)
  } catch (error) {
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
} 

//GET /produtos/count/
export async function countProducts(req, res){
  const curso = req.user.idCurso;
  
  try {
    const count = await productModel.countProducts(curso);
    return res.status(200).json(count)
  } catch (error) {
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
};

//PUT /produtos
export async function updateProduct(req, res){
  const {product} = req.body
  const idCurso = req.user.idCurso
  product.prodCurso = idCurso

  if(!product || !product.prodDescricao || !product.prodFabricante || !product.prodQuantidade || !product.prodValidade || !product.prodLote || !product.prodCurso || !product.prodTurma){
    return res.status(400).json({message: "Todos os campos são obrigatórios"})
  }

  try {
    const update = await productModel.updateProduct(product)
    if(update > 0){
      return res.status(200).json({message: "Produto Atualizado!"})
    } else {
      return res.status(500).json({message: "Erro ao atualizar produto!"})
    }
  } catch(error){
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
  
}

//DELETE /produtos/:id
export async function deleteProduct(req, res){
  const { id } = req.params

  try {
    const delProduct = await productModel.deleteProduct(id)
    if(delProduct > 0){
      return res.status(200).json({message: "Produto deletado!"})
    } else {
      return res.status(500).json({message: "Erro ao deletar produto!"})
    }
  } catch (error) {
    return res.status(400).json({message: `Erro: ${error.message}`})
  }
}
