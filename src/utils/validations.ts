/**
 * Verifica se o dia da data é válido (entre 01 e 31).
 * @param value | string - Data a ser validada.
 * @returns | boolean - Retorna true se o dia estiver entre 01 e 31 e false se estiver inválido.
 */

const isValidBRLDayDate = (value: string) => {
  const [day, _, __] = String(value).split('/');
  return Number(day) >= 1 && Number(day) <= 31;
};

/**
 * Verifica se o mês da data é válido (entre 01 e 12).
 * @param value | string - Data a ser validada.
 * @returns | boolean - Retorna true se o mês estiver entre 01 e 12 e false se estiver inválido.
 */
const isValidBRLMonthDate = (value: string) => {
  const [_, month, __] = String(value).split('/');
  return Number(month) >= 1 && Number(month) <= 12;
};

export { isValidBRLDayDate, isValidBRLMonthDate };
