import InputValidator from '../../../../../src/controllers/modules/InputValidator';

describe('digitIntegerString()', () => {
  test.each([['1'], ['13'], ['234213412341234'], ['-12'], ['0']])(
    '정상작동',
    input => {
      //given
      const testFucntion = () => InputValidator.digitIntegerString(input);

      //when
      expect(testFucntion).not.toThrow();
    }
  );

  test.each([
    ['1.1'],
    [''],
    ['-12341234.234'],
    ['0x123'],
    ['0b11'],
    ['0o11'],
    ['2e1'],
    ['1.1'],
    ,
  ])('예외', input => {
    //given
    const testFucntion = () => InputValidator.digitIntegerString(input);

    //when
    expect(testFucntion).toThrow('[ERROR]');
  });
});
