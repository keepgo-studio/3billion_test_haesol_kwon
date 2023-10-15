export const POSITION_LIST = [
  '의사',
  '간호사',
  '연구자',
  '행정 담당자'
] as const;

export type TPosition = typeof POSITION_LIST[number];