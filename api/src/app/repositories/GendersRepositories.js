const { v4 } = require('uuid');
const db = require('../../database/index');

let genders = [
  {
    id: 1,
    name: 'Action',
  },
  {
    id: 2,
    name: 'Adventure',
  },
  {
    id: 3,
    name: 'Comedy',
  },
  {
    id: 4,
    name: 'Romantic',
  },
];

class GendersRepositories {
  findAll() {
    return new Promise((resolve) => {
      resolve(genders);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(genders.find((gender) => gender.id === id));
    });
  }

  findByName(name) {
    return new Promise((resolve) => {
      resolve(genders.find((gender) => gender.name === name));
    });
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO genders(name)
      VALUES($1)
      RETURNING *
    `, [name]);

    return row;
  }

  update(id, { name }) {
    return new Promise((resolve) => {
      const updatedGender = {
        id,
        name,
      };
      genders = genders.map((gender) => (
        gender.id === id ? updatedGender : gender
      ));
      resolve(updatedGender);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      resolve(genders = genders.filter((gender) => gender.id !== id));
    });
  }
}

module.exports = new GendersRepositories();
