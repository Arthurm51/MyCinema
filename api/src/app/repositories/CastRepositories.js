const { v4 } = require('uuid');

let casts = [
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
      resolve(casts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-shadow
      resolve(casts.find((cast) => cast.id === id));
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

      casts.push(newCast);
      resolve(newCast);
    });
  }

  update(id, {
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
      const updateCast = {
        id,
        name,
        dateOfBirth: {
          day,
          month,
          year,
        },
        gender,
        nationality,
      };
      // eslint-disable-next-line no-shadow
      casts = casts.map((cast) => (
        cast.id === id ? updateCast : cast
      ));
      resolve(updateCast);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-shadow
      resolve(casts = casts.filter((cast) => cast.id !== id));
    });
  }
}
module.exports = new CastRepositories();
