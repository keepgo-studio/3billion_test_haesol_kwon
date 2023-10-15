import { checkValidation } from "./Email";
import { checkEmailDuplication } from "./state";

describe("이메일 계정", () => {
  // case 1
  test("이메일 형식으로 입력 되었는지", () => {
    expect(checkValidation('')).toBeFalsy();
    expect(checkValidation(null as any)).toBeFalsy();
    expect(checkValidation(undefined as any)).toBeFalsy();
    expect(checkValidation('123a')).toBeFalsy();
    expect(checkValidation('@@@@@')).toBeFalsy();
    expect(checkValidation('asd@nasd.s')).toBeFalsy();

    expect(checkValidation('test@net.com')).toBeTruthy();
    expect(checkValidation('good@asd.net')).toBeTruthy();
  })
  
  // case 2
  test("이메일 중복이 있는지", async () => {
    const code1 = await checkEmailDuplication('test@3billion.io');
    const code2 = await checkEmailDuplication('hello@3billion.io');

    expect(code1).toBeGreaterThanOrEqual(400);
    expect(code2).toBe(200);
  })
})
