/* eslint-disable consistent-return */

class ValidateTypes {
  isNumber(params) {
    const errors = [];

    // Percorre cada par chave/valor no objeto params
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value !== 'number' && typeof value !== 'undefined') {
        errors.push(`O parâmetro '${key}' deve ser um número, mas é do tipo '${typeof value}'.`);
      }
    });
    return errors;
  }

  // Método para validar se a categoria é compatível com a duração ou temporadas
  validateCategory(category, seasons, duration) {
    const errors = [];

    if (category.toLowerCase() === 'serie' || category.toLowerCase() === 'desenho' || category.toLowerCase() === 'anime') {
      if (typeof duration !== 'undefined') {
        errors.push(`Duration não é um parametro para a categoria '${category}'`);
      }
    } else if (category.toLowerCase() === 'filme') {
      if (typeof seasons !== 'undefined') {
        errors.push(`Seasons não é um parametro para a categoria '${category}'`);
      }
    } else {
      errors.push('Categoria incorreta');
    }
    return errors;
  }

  validateFields(data, response) {
    // Object.entries transforma o objeto requiredFields em uma matriz de pares [chave, valor]. ex: name(chave): 'homem aranha'(valor)
    // Verifica se algum campo obrigatório está ausente
    // eslint-disable-next-line no-unused-vars
    const missingField = Object.entries(data).find(([field, value]) => !value);

    // Se algum campo estiver ausente, retorna um erro 400 com o nome do campo
    // Desestruturação de arrays do JavaScript para extrair o primeiro elemento do array missingField que está em cima. (field)
    if (missingField) {
      const [field] = missingField;
      return response.status(400).json({ error: `Campo ${field} é obrigatório.` });
    }

    // Retorna null se não houver erros
    return null;
  }
}

module.exports = new ValidateTypes();
