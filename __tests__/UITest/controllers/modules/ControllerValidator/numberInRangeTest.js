import ControllerValidator from '../../../../../src/controllers/modules/ControllerValidator';

describe('numberInRange()', () => {
  test.each([
    [1, 0, 4],
    [2, 0, 8],
    [10, -Infinity, Infinity],
    [1, 1, 1],
    [10, 10, 11],
    [10.1, 10, 11],
  ])('정상작동', (number, lower, upper) => {
    //given
    const testFucntion = () =>
      ControllerValidator.numberInRange(number, lower, upper);

    //when
    expect(testFucntion).not.toThrow();
  });

  test.each([
    [1, 2, 3],
    [0.1, 2, 10],
    [-1, 2, 3],
  ])('예외', (number, lower, upper) => {
    //given
    const testFucntion = () =>
      ControllerValidator.numberInRange(number, lower, upper);

    //when
    expect(testFucntion).toThrow('[ERROR]');
  });
});
