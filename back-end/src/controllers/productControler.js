import { operacoesModel } from "../models/operacoesModel.js";
import { productModel } from "../models/productModel.js";

export async function insertProduct(req, res, next){

  const { product } = req.body;
  const idUser = req.user.idUser;
  const idCurso = req.user.idCurso;
  product.prodCurso = idCurso;


  if(!product || !product.prodDescricao || !product.prodFabricante || !product.prodQuantidade || !product.prodValidade || !product.prodLote || !product.prodCurso || !product.prodTurma){
    return res.status(400).json({message: "Todos os campos são obrigatórios"});
  }

  try {
    const newProductId = await productModel.createProduct(product);
    await operacoesModel.createOperacao(idUser, newProductId.idProduto, 1, product.prodQuantidade);
    return res.status(201).json({message: "Produto inserido com sucesso!"});
  } catch (error) {;
    next(error);
  }

};

export async function listProducts(req, res, next){
  const { turma } = req.params;
  const curso = req.user.idCurso;

  if(!curso || !turma){
    return res.status(400).json({message: "Parâmetros curso e turma ausentes."});
  }

  try {
    const list = await productModel.listAllProducts(curso, turma);
    return res.status(200).json(list);
  } catch (error) {
    next(error);
  };
};

export async function selectProduct(req, res, next){
  const { id } = req.params;

  if(!id){
    return res.status(400).json({message: "Parâmetro 'id' ausente."})
  }

  try {
    const product = await productModel.getProductById(id)
    return res.status(200).json(product)
  } catch (error) {
    next(error);
  }
};

export async function countProducts(req, res, next){
  const curso = req.user.idCurso;
  
  try {
    const count = await productModel.countProducts(curso);
    return res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};

export async function updateProduct(req, res, next){
  const {product} = req.body
  const idCurso = req.user.idCurso
  product.prodCurso = idCurso

  if(!product || !product.prodDescricao || !product.prodFabricante || !product.prodQuantidade || !product.prodValidade || !product.prodLote || !product.prodCurso || !product.prodTurma){
    return res.status(400).json({message: "Todos os campos são obrigatórios"})
  }

  try {
    const update = await productModel.updateProduct(product)
    if(update > 0){
      return res.status(200).json({message: "Produto Atualizado!"});
    } else {
      return res.status(500).json({message: "Erro ao atualizar produto!"});
    }
  } catch(error){
    next(error);
  }
  
};

export async function deleteProduct(req, res, next){
  const { id } = req.params;

  try {
    const delProduct = await productModel.deleteProduct(id);

    if(delProduct > 0){
      return res.status(200).json({message: "Produto deletado!"});
    } else {
      return res.status(500).json({message: "Erro ao deletar produto!"});
    }
  } catch (error) {
    next(error);
  }
};
