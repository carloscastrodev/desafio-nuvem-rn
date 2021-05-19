import 'number-to-locale-string-polyfill';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR.js';

function formatCoin(val: number): string {
  return val.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencySign: 'R$ ',
  });
}

export default formatCoin;
