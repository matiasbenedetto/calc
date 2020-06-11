import React, { useState, useEffect } from 'react';
import { MINUS, PLUS, MULTIPLY, DIVIDE, ERRORS } from './constants';
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

  useEffect(() => {
    updateDisplay();
  }, [left, operator, right, result]);

  function updateDisplay () {
    const newDisplay = `${displayNumber(left)}${operator || ''}${displayNumber(right)}` || `${result || ''}`;
    setDisplay(newDisplay);
  }

  function addNumber(digit) {
    setError(null);
    if(!operator){
      const newNumber = parseDigit(digit, left);
      setLeft(newNumber);
    } else {
      const newNumber = parseDigit(digit, right);
      setRight(newNumber);
    }
  }

  function addOperator(op) {
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

  function updateResult (newResult) {
    if(operator) {
      setResult(newResult);
      setDisplay(`${result}`);
      setLeft(newResult);
      setRight(null);
      setOperator(null);
    }
  }

  function calculate () {
    let newResult;
    if(operator === DIVIDE && !right) {
      setError(ERRORS.DIVIDE_BY_ZERO);
      restore(false);
    } else {
      switch(operator) {
        case PLUS:
          newResult = left + right;
          break;
        case MINUS:
          newResult = left - right;
          break;
        case MULTIPLY:
          newResult = left * right;
          break;
        case DIVIDE:
          newResult = left / right;
          break;
      }
      updateResult(
        Number(newResult.toFixed(9))
      );
    }
  }

  function restore (restoreError = true) {
    setResult(0);
    setDisplay('0');
    setLeft(null);
    setRight(null);
    setOperator(null);
    if (restoreError) {
      setError(null);
    }
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
          <Button char={PLUS} onClick={() => addOperator(PLUS)} backgroundColor="#ECEED8" />
          <Button char={MINUS} onClick={() => addOperator(MINUS)} backgroundColor="#ECEED8" />
          <Button char={DIVIDE} onClick={() => addOperator(DIVIDE)} backgroundColor="#ECEED8" />
          <Button char={MULTIPLY} onClick={() => addOperator(MULTIPLY)} backgroundColor="#ECEED8" />
          <Button char={"0"} onClick={() => addNumber(0)} />
          <Button char={"1"} onClick={() => addNumber(1)} />
          <Button char={"2"} onClick={() => addNumber(2)} />
          <Button char={"3"} onClick={() => addNumber(3)} />
          <Button char={"4"} onClick={() => addNumber(4)} />
          <Button char={"5"} onClick={() => addNumber(5)} />
          <Button char={"6"} onClick={() => addNumber(6)} />
          <Button char={"7"} onClick={() => addNumber(7)} />
          <Button char={"8"} onClick={() => addNumber(8)} />
          <Button char={"9"} onClick={() => addNumber(9)} />
          <Button char={"="} onClick={calculate} backgroundColor="#CCDE37"/>
          <Button char={"C"} onClick={restore} backgroundColor="#D1735F" />
        </div>
    </div>
  )
}

export default Calc;
