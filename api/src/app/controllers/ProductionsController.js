/* eslint-disable consistent-return */

const ProductionsRepositories = require('../repositories/ProductionsRepositories');

const ValidateTypes = require('../../utils/ValidateTypes');

class ProductionsController {
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

    const requiredFields = {
      name,
      category,
      gender,
      sinopse,
      director,
      cast,
      year,
      rating,
      ageRating,
    };

    const validationResult = ValidateTypes.validateFields(requiredFields, response);

    if (validationResult !== null) {
      // Erros de validação já foram tratados dentro da função
      return;
    }

    const isNumberErrors = ValidateTypes.isNumber({
      year, rating, ageRating, seasons, duration,
    });

    if (isNumberErrors.length > 0) {
      // Retorna uma resposta de erro com os detalhes dos erros
      return response.status(400).json({
        errors: isNumberErrors,
      });
    }

    if (typeof seasons === 'undefined' && typeof duration === 'undefined') {
      return response.status(400).json({ error: "Ao menos um dos campos 'seasons' ou 'duration' é obrigatório." });
    }

    // Valida a categoria
    const errorCategory = ValidateTypes.validateCategory(category, seasons, duration);

    if (errorCategory.length > 0) {
      return response.status(400).json(errorCategory);
    }
    // Cria uma nova produção no repositório
    const production = await ProductionsRepositories.create({
      name, category, gender, year, rating, comment, sinopse, director, cast, ageRating, duration, seasons,
    });
    // Retorna a nova produção como resposta JSON
    response.json(production);
  }

  async update(request, response) {
    const { id } = request.params;

    const {
      name, category, gender, year, rating, comment, sinopse, director, cast, ageRating, duration, seasons,
    } = request.body;

    const productionExists = await ProductionsRepositories.findById(id);

    if (!productionExists) {
      return response.status(404).json({ error: 'Production not found' });
    }

    const requiredFields = {
      name,
      category,
      gender,
      sinopse,
      director,
      cast,
      year,
      rating,
      ageRating,
    };

    const validationResult = ValidateTypes.validateFields(requiredFields, response);

    if (validationResult !== null) {
      // Erros de validação já foram tratados dentro da função
      return;
    }

    const isNumberErrors = ValidateTypes.isNumber({
      year, rating, ageRating, seasons, duration,
    });

    if (isNumberErrors.length > 0) {
      // Retorna uma resposta de erro com os detalhes dos erros
      return response.status(400).json({
        errors: isNumberErrors,
      });
    }

    if (typeof seasons === 'undefined' && typeof duration === 'undefined') {
      return response.status(400).json({ error: "Ao menos um dos campos 'seasons' ou 'duration' é obrigatório." });
    }

    // Valida a categoria
    const errorCategory = ValidateTypes.validateCategory(category, seasons, duration);

    if (errorCategory.length > 0) {
      return response.status(400).json(errorCategory);
    }

    const updateProduction = await ProductionsRepositories.update(id, {
      name, category, gender, year, rating, comment, sinopse, director, cast, ageRating, duration, seasons,
    });

    response.json(updateProduction);
  }

  async delete(request, response) {
    const { id } = request.params;
    const productionExists = await ProductionsRepositories.findById(id);
    if (!productionExists) {
      return response.status(404).json({ error: 'Production not found' });
    }

    await ProductionsRepositories.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ProductionsController();
