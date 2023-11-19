import Modelvalidator from '../../../../../src/models/modules/ModelValidator';

describe('dateInMonth()', () => {
  test.each([
    [[10, 3]],
    [[1, 1, false]],
    [[31, 12]],
    [[30, 6]],
    [[29, 2, true]],
  ])('정상작동', input => {
    //given
    const testFucntion = () => Modelvalidator.dateInMonth(...input);

    //when
    expect(testFucntion).not.toThrow();
  });

  test.each([
    [[32, 3]],
    [[31, 4, true]],
    [[31, 11]],
    [[29, 2]],
    [[29, 2, false]],
  ])('예외', input => {
    //given
    const testFucntion = () => Modelvalidator.dateInMonth(...input);

    //when
    expect(testFucntion).toThrow('[ERROR]');
  });
});
