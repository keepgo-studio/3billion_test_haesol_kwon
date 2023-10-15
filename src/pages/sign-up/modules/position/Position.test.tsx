import { POSITION_LIST } from "../../data"
import { checkSelectValidation } from "./Position"

test("직무를 제대로 선택하는지", () => {
  const wrongList = ['dum1', 'dum2', 'doctor', null, undefined];

  POSITION_LIST.forEach((_p) => expect(checkSelectValidation(_p)).toBeTruthy());

  wrongList.forEach((_p: any) => expect(checkSelectValidation(_p)).toBeFalsy());
})