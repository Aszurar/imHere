import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
const locale = 'pt-BR';

const dateFormatValidation = {
  format: /^\d{2}\/\d{2}\/\d{4}$/,
};

/**
 *Formata uma string de data para o formato 00/00/000;
 *@param value | string - String de data a ser formatada.
 *@returns | string - String de data formatada no formato dd/mm/aaaa.
 */
function maskDate(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1');
}

/**
 * Formata uma string de data no formato 'dd/mm/aaaa' para uma sentença
 * em português com a data por extenso.
 * @param dateString | string - String de data no formato 'dd/mm/aaaa'
 * a ser formatada.
 * @returns | string - String de data formatada em uma sentença por
 * extenso, no formato 'Dia da semana, dia de mês por extenso de ano'.
 */
function formatDateToSetence(dateString: string): string {
  if (!dateString.trim()) {
    return '';
  }
  const dateParts = dateString.split('/');
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const year = parseInt(dateParts[2]);
  const date = new Date(year, month, day);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  return `${weekday}, ${day} de ${monthName} de ${year}`;
}

export { dateFormatValidation, formatDateToSetence, maskDate };
