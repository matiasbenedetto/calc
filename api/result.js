const { PLUS, MINUS, MULTIPLY, DIVIDE, ERRORS } = require("../constants");

function result (req, res) {
  const { left, operator, right } = req.body;
  let result = 0;
  let error = null;
  if(operator === DIVIDE && !right) {
    error = ERRORS.DIVIDE_BY_ZERO;
  } else {
    switch(operator) {
      case PLUS:
        result = left + right;
        break;
      case MINUS:
        result = left - right;
        break;
      case MULTIPLY:
        result = left * right;
        break;
      case DIVIDE:
        result = left / right;
        break;
    }
  }
  res.json({ result, error });
}

module.exports = result;
