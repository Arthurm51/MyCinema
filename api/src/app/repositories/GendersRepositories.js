const { v4 } = require('uuid');

let genders = [
  {
    id: v4(),
    name: 'Action',
  },
  {
    id: v4(),
    name: 'Adventure',
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

  create({ name }) {
    return new Promise((resolve) => {
      const newGender = {
        id: v4(),
        name,
      };
      genders.push(newGender);
      resolve(newGender);
    });
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
