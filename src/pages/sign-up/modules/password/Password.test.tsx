import { checkFormatValidation, checkPasswordValidation } from "./Password";

describe("비밀번호 설정", () => {
  // case 1
  test("비밀번호 규칙에 맞게 입력 되었는지", () => {
    expect(checkFormatValidation('')).toBeFalsy();
    expect(checkFormatValidation(null as any)).toBeFalsy();
    expect(checkFormatValidation(undefined as any)).toBeFalsy();
    expect(checkFormatValidation('123a')).toBeFalsy();
    expect(checkFormatValidation('@@@@@')).toBeFalsy();
    expect(checkFormatValidation('aasds')).toBeFalsy();
    expect(checkFormatValidation('aasdsㄱㄴㄷㄹㅁㅂㅅ')).toBeFalsy();

    expect(checkFormatValidation('12345678')).toBeTruthy();
    expect(checkFormatValidation('123@verg')).toBeTruthy();
    expect(checkFormatValidation('good123password')).toBeTruthy();
  })
  
  // case 2
  test("비교함수 확인", () => {
    expect(checkPasswordValidation('goodpassword', 'goodpassword')).toBeTruthy();
    expect(checkPasswordValidation('12345678', 12345678 as any)).toBeFalsy();
  })
})
