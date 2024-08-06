/* eslint-disable consistent-return */
const GendersRepositories = require('../repositories/GendersRepositories');

class GendersController {
  async index(request, response) {
    const gender = await GendersRepositories.findAll();
    response.json(gender);
  }

  async show(request, response) {
    const { id } = request.params;
    const gender = await GendersRepositories.findById(id);
    if (!gender) {
      return response.status(404).json({ error: 'Genero não encontrado!' });
    }
    response.json(gender);
  }

  async store(request, response) {
    const { name } = request.body;
    const genderExists = await GendersRepositories.findByName(name);
    if (genderExists) {
      return response.status(400).json({ error: 'Gênero já existente' });
    }
    const gender = await GendersRepositories.create({ name });
    response.json(gender);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const gender = await GendersRepositories.findById(id);
    if (!gender) {
      return response.status(404).json({ error: 'Genero não encontrado!' });
    }
    const genderExists = await GendersRepositories.findByName(name);
    if (genderExists) {
      return response.status(400).json({ error: 'Gênero já existente' });
    }
    const updateGender = await GendersRepositories.update(id, { name });

    response.json(updateGender);
  }

  async delete(request, response) {
    const { id } = request.params;

    const gender = await GendersRepositories.findById(id);
    if (!gender) {
      return response.status(404).json({ error: 'Genero não encontrado!' });
    }
    await GendersRepositories.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new GendersController();
