const result = require('./result');
const { MULTIPLY, DIVIDE, ERRORS } = require('../constants');

const mockResponse = {
  json: jest.fn(),
};

describe('result endpoint', () => {
  it('output a result if the input is ok', () => {
    const mockRequest = {
      body: {
        left: 10,
        operator: MULTIPLY,
        right: 20,
      }
    };
    const mockOkOutput = {
      result: 200,
      error: null,
    };
    result(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalled();
    expect(mockResponse.json).toBeCalledWith(mockOkOutput);
  });

  it('output an error if the input is invalid', () => {
    const mockRequest = {
      body: {
        left: 10,
        operator: DIVIDE,
        right: 0,
      },
    };
    const mockErrorResponse = {
      result: 0,
      error: ERRORS.DIVIDE_BY_ZERO,
    };
    result(mockRequest, mockResponse);
    expect(mockResponse.json).toBeCalled();
    expect(mockResponse.json).toBeCalledWith(mockErrorResponse);
  });
});