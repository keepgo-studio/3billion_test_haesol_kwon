import { checkValidation } from "./License"

test("면허 번호가 제대로 입력 되었는지", () => {
  expect(checkValidation('')).toBeFalsy();
  expect(checkValidation(null)).toBeFalsy();
  expect(checkValidation(undefined as any)).toBeFalsy();
  expect(checkValidation('123a')).toBeFalsy();
  expect(checkValidation('@@@@@')).toBeFalsy();
  expect(checkValidation('@@123')).toBeFalsy();

  expect(checkValidation('123abs')).toBeTruthy();
  expect(checkValidation('aaaaa')).toBeTruthy();
  expect(checkValidation('12345')).toBeTruthy();
})