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

/** @xstate-layout N4IgpgJg5mDOIC5SwJZQHYAICuAHAdIIOTgLN0DEJmgBIOC7C4BqrgDHUDaADALqKi4D2qALil3QcQAD0QBaAIwBWAMz5pAJmbMAnABZZADlWTdkgOwAaEAE9EixevyqDANmmPp9u69WyAvh5OoMOAoAxg4Cxg5j0gAC1pMGhYZiAoeOApB0MLOxIINx8AkKpYgjilsw2iloGWlZlKpIm5gjSWlqFWtLMikqysuqKdl4+aFh4+FHhkSHhcYlMkimcPCj8gsI54up2BgqKkswGtbKKqjrqVYgGBpL4klrqzfYGGirq3SC+fQSALl2AE6uYgBE9gBxrpO9f3zGSTYwnSs0yCwkMjsNi0G2YOncdlk0jshwQx1O50uimut2Y928j16-nwgBdxwAqXYAfcdIlKpQKYINSYLmWVAi0kyLOslsOxOagqinRmmsF20WjsllkNyKDyepMAIn2AAB6fqRlT8GclQTNWZCEJIrKteZpVA51O4WuidDD1DIZE1Os1VKo5ST+urfgAjACGAGMANZa5k6iHZRCSHY2JQdJSbLbNIVmRClU6KNrta3qeydV1+fqDCI+gNB6YZeZh-XS2FaaWNAyySQG4xJhDqZwKAwEzstQ1yXPPcnU0hFwNM0vg8vs8MdfCd5iNzZ2Nso+zolow+vKexZ2R2DSEnp514fVUjktpEOT0SIdz4FrqLTMHaGCXMaQHFt2c6FOxxkq2rR+1Jf5Tz9QNJm1Ms2WvBB1g3ZFiglZE2jqYV22cAl1GWa4Ti6B50C4CA4GEeU8EgidoMWaQZDWDYthrXYdGkNd5EsBxLAfX9bSzaQgP6EhyN1CtbRsZ0xPEsSJXRTlTk7CV107Y5ij4wIRjCQTQynfVVDOVQ1B5HZJU3Zp0TkeRlkMHZdHNSU8MPAcQO+DSrxyXYzmKLMNEMB8LPRPdpAUVRqOUd8Iw0XiiVIgg6WcyiLFOR9nBaJQtjaJt0RReR32KbznCCxQVPwD1Yr1GcVBOUoDB8nlOWkiobFcBxjlS-TCogQQwBKisZARfAVnOVRdiqnktmkjZZ06FLXCdaUIq8IA */
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
          target: "이메일",
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
          target: "비밀번호",
          actions: "assign organization"
        }],

        back: "이메일"
      }
    },

    "면허 번호": {
      on: {
        "면허 번호 입력하기": {
          target: "비밀번호",
          actions: "assign license"
        },

        back: [{
          target: "소속 기관",
          cond: "면허 있음"
        }, "이메일"]
      }
    },

    "이메일": {
      on: {
        "이메일 입력하기": {
          target: "소속 기관",
          actions: "assign email"
        },

        back: "직무"
      }
    },

    "비밀번호": {
      on: {
        "비밀번호 입력하기": {
          target: "done",
          actions: "assign password"
        },

        back: "면허 번호"
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
      position: (_, e) => e.value,
      organization: (c, e) => c.position === e.value ? c.organization : null,
      license: (c, e) => c.position === e.value ? c.license : null,
      email: (c, e) => c.position === e.value ? c.email : null,
      password: (c, e) => c.position === e.value ? c.password : null
    }),
    "assign organization": assign({
      organization: (_, e) => e.value,
      license: (c, e) => c.organization === e.value ? c.license : null,
      email: (c, e) => c.organization === e.value ? c.email : null,
      password: (c, e) => c.organization === e.value ? c.password : null
    }),
    "assign license": assign({
      license: (_, e) => e.value,
      email: (c, e) => c.license === e.value ? c.email : null,
      password: (c, e) => c.license === e.value ? c.password : null
    }),
    "assign email": assign({
      email: (_, e) => e.value,
      password: (c, e) => c.email === e.value ? c.password : null
    }),
    "assign password": assign({
      password: (_, e) => e.value
    }),
  },
  guards: {
    "면허 있음": (context, _) => context.position === "의사" || context.position === "간호사"
  }
});