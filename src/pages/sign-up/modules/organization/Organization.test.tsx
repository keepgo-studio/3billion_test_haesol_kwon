import { checkValidation } from "./Organization"

test("조직을 제대로 선택하는지", () => {
  expect(checkValidation('')).toBeFalsy();
  expect(checkValidation(null)).toBeFalsy();
  expect(checkValidation(undefined as any)).toBeFalsy();
  expect(checkValidation('hospital')).toBeTruthy();
  expect(checkValidation('industry')).toBeTruthy();
})