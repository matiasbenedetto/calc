import { MINUS } from './constants';

export function displayNumber (n) {
  console.log('n', n);
  if (n === null) {
    return '';
  }
  if (Object.is(n, -0)) {
    return '-';
  }
  if (Object.is(n, 0)) {
    return '0';
  }
  return `${n}`;
}

export function parseDigit (digit, value) {
  if (digit === MINUS) {
    return -0;
  } else {
    if (!Object.is(digit, -0)) {
      return Number(`${value || ''}${digit}`);
    }
    return Number(`-${digit}`);
  }
}