const CastRepositories = require('../repositories/CastRepositories');
const ValidateTypes = require('../../utils/ValidateTypes');

class CastController {
  async index(request, response) {
    const cast = await CastRepositories.findAll();
    response.json(cast);
  }

  async show(request, response) {
    const { id } = request.params;
    const cast = await CastRepositories.findById(id);
    if (!cast) {
      return response.status(404).json({ error: 'Ator ou atriz não encontrado(a)!' });
    }
    response.json(cast);
  }

  async store(request, response) {
    const {
      name,
      dateOfBirth, // desestruture o objeto principal
      gender,
      nationality,
    } = request.body;
    // desestrutura o objeto aninhado separadamente
    const { day, month, year } = dateOfBirth;

    const data = {
      name, dateOfBirth, day, month, year, gender, nationality,
    };

    const requiredFields = ValidateTypes.validateFields(data, response);

    if (requiredFields !== null) {
      // Retorna uma resposta de erro com os detalhes dos erros
      return;
    }

    const isNumberErrors = ValidateTypes.isNumber(dateOfBirth);

    // Verifica se o array de erros não está vazio
    if (isNumberErrors.length > 0) {
      // Retorna uma resposta de erro com os detalhes dos erros
      return response.status(400).json({
        errors: isNumberErrors,
      });
    }

    const cast = await CastRepositories.create({
      name,
      dateOfBirth: { // Agrupando as propriedades de data de nascimento
        day,
        month,
        year,
      },
      gender,
      nationality,
    });
    response.json(cast);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name,
      dateOfBirth, // desestruture o objeto principal
      gender,
      nationality,
    } = request.body;
    // desestrutura o objeto aninhado separadamente
    const { day, month, year } = dateOfBirth;

    const data = {
      name, dateOfBirth, day, month, year, gender, nationality,
    };

    const requiredFields = ValidateTypes.validateFields(data, response);

    if (requiredFields !== null) {
      // Retorna uma resposta de erro com os detalhes dos erros
      return;
    }

    const isNumberErrors = ValidateTypes.isNumber(dateOfBirth);

    // Verifica se o array de erros não está vazio
    if (isNumberErrors.length > 0) {
      // Retorna uma resposta de erro com os detalhes dos erros
      return response.status(400).json({
        errors: isNumberErrors,
      });
    }

    const updatedCast = await CastRepositories.update(id, {
      name,
      dateOfBirth: { // Agrupando as propriedades de data de nascimento
        day,
        month,
        year,
      },
      gender,
      nationality,
    });
    response.json(updatedCast);
  }

  async delete(request, response) {
    const { id } = request.params;
    const castExists = await CastRepositories.findById(id);
    if (!castExists) {
      return response.status(404).json({ error: 'Actor/Actress not found' });
    }

    await CastRepositories.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CastController();
