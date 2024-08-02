/* eslint-disable consistent-return */

const ProductionsRepositories = require('../repositories/ProductionsRepositories');

const ValidateTypes = require('../../utils/ValidateTypes');

class ProductionController {
  // Método assíncrono para listar todas as produções
  async index(request, response) {
    const production = await ProductionsRepositories.findAll();
    response.json(production);
  }

  // Método assíncrono para exibir uma produção específica pelo ID
  async show(request, response) {
    const { id } = request.params;
    const production = await ProductionsRepositories.findById(id);
    if (!production) {
      return response.status(404).json({ error: 'Produção não encontrada!' });
    }
    response.json(production);
  }

  // Método assíncrono para criar uma nova produção
  async store(request, response) {
    // Extrai os campos da requisição JSON
    const {
      name, category, gender, year, rating, comment, sinopse, director, cast, ageRating, duration, seasons,
    } = request.body;

    // Define os campos obrigatórios para validação
    const requiredFields = {
      name,
      category,
      gender,
      sinopse,
      director,
      cast,
    };

    // Object.entries transforma o objeto requiredFields em uma matriz de pares [chave, valor]. ex: name(chave): 'homem aranha'(valor)
    // Verifica se algum campo obrigatório está ausente
    // eslint-disable-next-line no-unused-vars
    const missingField = Object.entries(requiredFields).find(([field, value]) => !value);

    // Se algum campo estiver ausente, retorna um erro 400 com o nome do campo
    // Desestruturação de arrays do JavaScript para extrair o primeiro elemento do array missingField que está em cima. (field)
    if (missingField) {
      const [field] = missingField;
      return response.status(400).json({ error: `Campo ${field} é obrigatório.` });
    }

    // Valida se os campos numéricos são realmente números
    const errorsTypeNumber = ValidateTypes.isNumber({
      year, rating, ageRating,
    });

    // Valida se a categoria é compatível com a duração ou temporadas
    const errorCategory = ValidateTypes.validateCategory(category, seasons, duration);

    if (errorCategory.length > 0) {
      return response.status(400).json(errorCategory);
    }

    if (errorsTypeNumber.length > 0) {
      return response.status(400).json(errorsTypeNumber);
    }

    // Cria uma nova produção no repositório
    const production = await ProductionsRepositories.create({
      name, category, gender, year, rating, comment, sinopse, director, cast, ageRating, duration, seasons,
    });
    // Retorna a nova produção como resposta JSON
    response.json(production);
  }
}

module.exports = new ProductionController();
