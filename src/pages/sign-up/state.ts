import { assign, createMachine } from "xstate";
import { TPosition } from "./data";


interface  ISignUpContext {
  position: TPosition | null;
  organization: string | null;
  license: string | null;
  email: string | null;
  password: string | null;
};

type TSignUpEvents =
| { type: "직무 선택하기", value: TPosition }
| { type: "소속 기관 입력하기", value: string }
| { type: "면허 번호 입력하기", value: string }
| { type: "이메일 입력하기", value: string }
| { type: "비밀번호 입력하기", value: string }
| { type: "back" }
;

/** @xstate-layout N4IgpgJg5mDOIC5SwJZQHYAICuAHAdIIOTgLN0DEJmgBIOC7C4BqrgDHUDaADALqKi4D2qALil3QcQAD0QBGAEwBWfAE4FC6eIAs0gGwAOAOwBmcQBoQAT0Q7549eunSVunSpWTxAXxdHUGHAUAxg4FjBzHpAAFrSf0CgzEBQ8cBSDoYWdiQQbj4BIUSxBBVmSXlpfXENTV1tSV0VbSNTBE1xfBVFOX0ilXUWyTcPNCw8fDDg0IDgqNimcQTOHhR+QWEMrJy5PPECrWLS8srESUkVeW1rG2l9q3VGjpBPbt9BkIAjAEMAYwBreOFkqdTZiXVmfGl1pJ9nltJp6psEABacTafDMTTMZZSXS6RoA8S6c6Xbz4QAuXYAJ1cwgAiewAca6QCcSScM4mx3pNpmlQBkEX91NpxDptNIFL9thCanUGk0yq1rFiujiKaTSA8Xm9Eh8Gd9MnJYZpubotJoEdonCoIdDYfDEctSqjdOjMe4LhKeoAXccAKl2AH3HSI6ndSmLSFfSvukJMw2fh1Y0eaV1pp+Zp8LqFDVdJI5Kc5EDxV57c6ZU9Xl6JikZn6EKDdoiNCWEbZVQaYXCEUizWjnFbOmmCG7M3KxnS84zRIhQbU9HY5OI5I5mLrJFXmH9tHJEcxGuP1Yj2tbsT1ACJ9gAAe6Xb0ke+W5z75pkSFG1eNx9SoxZaSPR+pyOMJpMpte2gh7smy7PjJI+k9ewQcQF1haRp2yGEQI0FEqyNWtTRRBsMTca10C4CA4GEddcC7Y8ewySF1CrbV8ATFduUcLUuVTK4iGIPClQLJwISRfBVHjeE9E0VUX1onE+iCRjfVPBAE10fBLyRdQzTsIpWOWdi7FKECrBA7QaPfFs8UJUlhMAjJTlqZgWh0C1UW2IFWJM6NJGsLUQM0SQak0fj0ydfSCMQVVdmTDlVQDGSR0MEwJEU1VrFnZyVBHfZtDcz8dxJTzlSkGQ6mcHiAQ1AEI1C4DwuBEUE2TWdXK0uiIEEMAUoLAp4XwNl-ITXVUS5BSZzsgFjmyRpNLcIA */
export const SignUpMachine = createMachine({
  id: "sign up",

  tsTypes: {} as import("./state.typegen").Typegen0,

  schema: {
    context: {} as ISignUpContext,
    events: {} as TSignUpEvents
  },

  predictableActionArguments: true,

  context: {
    position: null,
    license: null,
    organization: null,
    email: null,
    password: null,
  },

  states: {
    "직무": {
      on: {
        "직무 선택하기": {
          target: "소속 기관",
          actions: "assign position"
        },
      },
    },

    "소속 기관": {
      on: {
        "소속 기관 입력하기": [{
          target: "면허 번호",
          cond: "면허 있음",
          actions: "assign organization"
        }, {
          target: "이메일",
          actions: "assign organization"
        }],

        back: "직무"
      }
    },

    "면허 번호": {
      on: {
        "면허 번호 입력하기": {
          target: "이메일",
          actions: "assign license"
        },

        back: "소속 기관"
      }
    },

    "이메일": {
      on: {
        "이메일 입력하기": {
          target: "비밀번호",
          actions: "assign email"
        },

        back: [{
          target: "면허 번호",
          cond: "면허 있음"
        }, "소속 기관"]
      }
    },

    "비밀번호": {
      on: {
        "비밀번호 입력하기": {
          target: "done",
          actions: "assign password"
        },

        back: "이메일"
      }
    },

    done: {
      type: "final"
    }
  },

  initial: "직무"
}, {
  actions: {
    "assign position": assign({
      position: (_, e) => e.value
    }),
    "assign organization": assign({
      organization: (_, e) => e.value
    }),
    "assign license": assign({
      license: (_, e) => e.value
    }),
    "assign email": assign({
      email: (_, e) => e.value
    }),
    "assign password": assign({
      password: (_, e) => e.value
    }),
  },
  guards: {
    "면허 있음": (context, _) => context.position === "의사" || context.position === "간호사"
  }
});