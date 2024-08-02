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

    if (category === 'Serie' || category === 'Desenho' || category === 'Anime') {
      errors = this.isNumber({ seasons });
      if (typeof duration !== 'undefined') {
        errors.push(`Duration não é um parametro para a categoria '${category}'`);
      }
    } else if (category === 'Filme') {
      errors = this.isNumber({ duration });
      if (typeof seasons !== 'undefined') {
        errors.push(`Seasons não é um parametro para a categoria '${category}'`);
      }
    } else {
      errors.push('Categoria incorreta');
    }
    return errors;
  }
}

module.exports = new ValidateTypes();
