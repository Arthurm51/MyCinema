/* eslint-disable consistent-return */

class ValidateTypes {
  isNumber(params) {
    const errors = [];

    // Percorre cada par chave/valor no objeto params
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === 'undefined') {
        errors.push(`O parâmetro '${key}' é obrigatorio.`);
      } else if (typeof value !== 'number') {
        errors.push(`O parâmetro '${key}' deve ser um número, mas é do tipo '${typeof value}'.`);
      }
    });
    return errors;
  }

  // Método para validar se a categoria é compatível com a duração ou temporadas
  validateCategory(category, seasons, duration) {
    let errors = [];

    if (category.toLowerCase() === 'serie' || category.toLowerCase() === 'desenho' || category.toLowerCase() === 'anime') {
      errors = this.isNumber({ seasons });
      if (typeof duration !== 'undefined') {
        errors.push(`Duration não é um parametro para a categoria '${category}'`);
      }
    } else if (category.toLowerCase() === 'filme') {
      errors = this.isNumber({ duration });
      if (typeof seasons !== 'undefined') {
        errors.push(`Seasons não é um parametro para a categoria '${category}'`);
      }
    } else {
      errors.push('Categoria incorreta');
    }
    return errors;
  }

  validateFields(data, response) {
    const {
      name, category, gender, sinopse, director, cast, year, rating, ageRating, seasons, duration,
    } = data;

    // Verifica se há campos obrigatórios ausentes
    const requiredFields = {
      name, category, gender, sinopse, director, cast,
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

    // Valida se os campos numéricos têm o tipo correto
    const errorsTypeNumber = this.isNumber({ year, rating, ageRating });

    if (errorsTypeNumber.length > 0) {
      return response.status(400).json(errorsTypeNumber);
    }

    // Valida a categoria
    const errorCategory = this.validateCategory(category, seasons, duration);

    if (errorCategory.length > 0) {
      return response.status(400).json(errorCategory);
    }

    // Retorna null se não houver erros
    return null;
  }
}

module.exports = new ValidateTypes();
