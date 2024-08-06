const { v4 } = require('uuid');

let productions = [
  {
    id: v4(),
    name: 'Velozes e furiosos',
    category: 'Filme',
    gender: ['Ação', 'Ficção cientifica'],
    year: 2013,
    rating: 4,
    comment: 'Filme muito bom!',
    sinopse: "Desde que o ex-policial Brian O'Conner e Mia Toretto libertaram Dom da prisão, eles viajam pelo mundo para fugir das autoridades. No Rio de Janeiro, eles são obrigados a fazer um último trabalho antes de ganhar sua liberdade definitiva. Brian e Dom montam uma equipe de elite de pilotos de carro para executar a tarefa, mas precisam enfrentar um empresário corrupto e também um obstinado agente federal norte-americano.",
    director: 'Justin Lin',
    cast: ['Paul Walker', 'Vin Diesel'],
    ageRating: 14,
    duration: 131,
  },
  {
    id: v4(),
    name: 'How i met your mother',
    category: 'Serie',
    gender: ['Comedia', 'Romance'],
    year: 2001,
    rating: 5,
    comment: 'Serie incrivel!',
    sinopse: 'Ted Mosby conta para seus filhos a história de como ele conheceu a mãe deles. Enquanto isso, ele relembra as aventuras e desventuras amorosas que viveu com seus amigos Marshall, Lily, Barney e Robin em Nova York',
    director: 'Pamela Fryman',
    cast: ['Josh Radnor', 'Jason Segel', 'Neil Patrick Harris'],
    ageRating: 12,
    seasons: 9,
  },
];

class ProductionsRepositories {
  // Método para encontrar todas as produções
  findAll() {
    return new Promise((resolve) => {
      resolve(productions);
    });
  }

  // Método para encontrar uma produção pelo ID
  findById(id) {
    return new Promise((resolve) => {
      resolve(productions.find((production) => production.id === id));
    });
  }

  // Método para criar uma nova produção
  create({
    name, category, gender, year, rating, comment, sinopse, director, cast, ageRating, duration, seasons,
  }) {
    return new Promise((resolve) => {
      const newProduction = {
        id: v4(),
        name,
        category,
        gender,
        year,
        rating,
        comment,
        sinopse,
        director,
        cast,
        ageRating,
        duration,
        seasons,
      };
      // Adiciona a nova produção ao "banco de dados"
      productions.push(newProduction);
      resolve(newProduction);
    });
  }

  update(id, {
    name, category, gender, year, rating, comment, sinopse, director, cast, ageRating, duration, seasons,
  }) {
    return new Promise((resolve) => {
      const updatedProduction = {
        id,
        name,
        category,
        gender,
        year,
        rating,
        comment,
        sinopse,
        director,
        cast,
        ageRating,
        duration,
        seasons,
      };

      productions = productions.map((production) => (
        production.id === id ? updatedProduction : production
      ));
      resolve(updatedProduction);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-shadow
      resolve(productions = productions.filter((productions) => productions.id !== id));
    });
  }
}

module.exports = new ProductionsRepositories();
