const { v4 } = require('uuid');

const cast = [
  {
    id: v4(),
    name: 'Vin Diesel',
    dateOfBirth: {
      day: 21,
      month: 2,
      year: 1977,
    },
    gender: 'male',
    nationality: 'American',
  },
  {
    id: v4(),
    name: 'Paul Walker',
    dateOfBirth: {
      day: 12,
      month: 11,
      year: 1980,
    },
    gender: 'male',
    nationality: 'American',
  },
];
class CastRepositories {
  findAll() {
    return new Promise((resolve) => {
      resolve(cast);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-shadow
      resolve(cast.find((cast) => cast.id === id));
    });
  }

  create({
    name,
    dateOfBirth: {
      day,
      month,
      year,
    },
    gender,
    nationality,
  }) {
    return new Promise((resolve) => {
      const newCast = {
        id: v4(),
        name,
        dateOfBirth: {
          day,
          month,
          year,
        },
        gender,
        nationality,
      };
      cast.push(newCast);
      resolve(newCast);
    });
  }
}

module.exports = new CastRepositories();
