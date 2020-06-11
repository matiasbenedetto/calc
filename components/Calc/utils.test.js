import { displayNumber, parseDigit } from './utils';
import { MINUS } from '../../constants';

describe ('display number function', () => {
  it('outputs empty string on null input', () => {
    const output = displayNumber(null);
    expect(output).toBe('');
  });

  it('outputs - on negative zero input', () => {
    const output = displayNumber(-0);
    expect(output).toBe('-');
  });

  it('outputs 0 on zero input', () => {
    const output = displayNumber(0);
    expect(output).toBe('0');
  });

  it('outputs n on number input', () => {
    const output = displayNumber(987);
    expect(output).toBe('987');
  });
});

describe ('parse digit', () => {
  it('outputs negative zero receiving MINUS', () => {
    const output = parseDigit(MINUS, null);
    expect(output).toBe(-0);
  });

  it('concatenate number receiving numer', () => {
    const output = parseDigit(5, 10);
    expect(output).toBe(105);
  });

  it('concatenate as negative ', () => {
    const output = parseDigit(9, -0);
    expect(output).toBe(-9);
  });
});