import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MINUS, PLUS, MULTIPLY, DIVIDE, ERRORS } from '../../constants';
import { parseDigit, displayNumber } from './utils';
import Button from '../Button';
import Viewr from '../Viewr';

function Calc() {
  const [result, setResult] = useState(0);
  const [display, setDisplay] = useState('0');
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [operator, setOperator] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateDisplay();
  }, [left, operator, right, result]);

  const updateDisplay = () => {
    const newDisplay = `${displayNumber(left)}${operator || ''}${displayNumber(right)}` || `${result || ''}`;
    setDisplay(newDisplay);
  }

  const addNumber = (digit) => {
    setError(null);
    if(!operator){
      const newNumber = parseDigit(digit, left);
      setLeft(newNumber);
    } else {
      const newNumber = parseDigit(digit, right);
      setRight(newNumber);
    }
  }

  const addOperator = (op) => {
    if(op === '-' && (operator || !left) && !right) {
      addNumber(op);
    } else {
      if (operator && right) {
        calculate();
      }
      if (left) {
        setOperator(op);
      }
    }
    if(op !== '-' && !left) {
      setError(ERRORS.INVALID_EXPRESSION)
    }
  }

  const updateResult = (newResult) => {
    if(operator) {
      setResult(newResult);
      setDisplay(`${result}`);
      setLeft(newResult);
      setRight(null);
      setOperator(null);
    }
  }

  const calculate = async () => {
    setLoading(true);
    const { data } = await axios.post('/result', {
      left, operator, right,
    });
    if (data.error) {
      setError(data.error);
      restore(false);
    } else {
      updateResult(
        Number(data.result.toFixed(9))
      );
    }
    setLoading(false);
  }

  const restore = (restoreError = true) => {
    setResult(0);
    setDisplay('0');
    setLeft(null);
    setRight(null);
    setOperator(null);
    if (restoreError) {
      setError(null);
    }
  }

  const opButtonProps = {
    color: '#ECEED8',
    disabled: loading,
  }

  return (
    <div className="calc">
      <style jsx>
        {`
          .calc {
            border: 2px solid blue;
            width: 600px;
            font-family: Arial, Helvetica, sans-serif;
          }
          .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
          }
        `}
      </style>
      <Viewr result={`${result}`} display={display} error={error} />
        <div className="buttons">
          <Button char={PLUS} onClick={() => addOperator(PLUS)} {...opButtonProps} />
          <Button char={MINUS} onClick={() => addOperator(MINUS)} {...opButtonProps} />
          <Button char={DIVIDE} onClick={() => addOperator(DIVIDE)} {...opButtonProps} />
          <Button char={MULTIPLY} onClick={() => addOperator(MULTIPLY)} {...opButtonProps} />
          <Button char={"0"} onClick={() => addNumber(0)} disabled={loading} />
          <Button char={"1"} onClick={() => addNumber(1)} disabled={loading} />
          <Button char={"2"} onClick={() => addNumber(2)} disabled={loading} />
          <Button char={"3"} onClick={() => addNumber(3)} disabled={loading} />
          <Button char={"4"} onClick={() => addNumber(4)} disabled={loading} />
          <Button char={"5"} onClick={() => addNumber(5)} disabled={loading} />
          <Button char={"6"} onClick={() => addNumber(6)} disabled={loading} />
          <Button char={"7"} onClick={() => addNumber(7)} disabled={loading} />
          <Button char={"8"} onClick={() => addNumber(8)} disabled={loading} />
          <Button char={"9"} onClick={() => addNumber(9)} disabled={loading} />
          <Button char={"="} onClick={calculate} color="#CCDE37" disabled={loading}/>
          <Button char={"C"} onClick={restore} color="#D1735F" disabled={loading} />
        </div>
    </div>
  )
}

export default Calc;
