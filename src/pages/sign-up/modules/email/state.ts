import { assign, createMachine } from "xstate";

interface IEmailContext {
  email: string;
  errorMsg: string;
  valid: boolean;
}

type TEmailEvents = 
| { type: "type new email"; email: string }
| { type: "check format"; }
;

type TService = {
  "check server": {
    data: string;
  }
}

/** @xstate-layout N4IgpgJg5mDOIC5RgLYEMCWAbAdBiWYAxAMYAWYJA1gAQBmA9gE7oAuA2gAwC6ioADg1gZWGBgDs+IAB6IATAEYAnDgAsnAGxz1ADh0BmTquP6ANCACe81QHYcSmxoCsNufoVyjc1wF8f51ExcfEJSCmp6ZjZ2BV4kEEFhUQkpWQRFFXUtXQMjE3MrBCd9VRxPdzdVfWclar8A9Gw8AmJWC34wGnEwAHcaQOwuOIEhETFJeLSAWgVOHRxOJTkNDSVNVWUS1QL5HU4cfRtVJQ1jmyWFHWd68EbcADc0LHxIljRWIiGpRLGUycRTgp7Jo5MV9IdFk4duljmpHE5jpolpoNDcBrgwEwmMwiG0Ol1ev07l94j9khNQNNZvNFst9HtbAYdKDofolPNVKtPDZijY+Zc0XccGh+BgiBAJGA8OJ7gwqFL0cLRQgMDKGCR3uMhiSRklxqlEEpbPYNFclA41qsedC3E4yssEc4nYYFKpBUElWLMdimDh+Fh3owWDhFSKMCq1RrydqeN9RuSDQgjXYTmaLUjrZZdnIcK5nAjHK6jm7-LcPRLurj2p1un10TqEvH9f8EDM5gslhp6UYbEzXdDXfocAYFAobFsnAinDo-KXxAwIHApOi43q-pTEDMnBoO8tVutNsYbXbDOzzlpOAonMpUaXFSEwKvfhSZIgDLnOBUqpw+UYFBpjyBfQHVNVRcicc13SaR5nggV42CfBMWycS8cA0GxlE0EEtm2LMYQ5eETHZORvGZKCMSxZhEObDcEFHTlgQ0QcdAw2pRxtc40MvBF6Iw7QSwaD0w2o9dXwQccd3Nc0u3ZdC2JtbR7EI7dtzZJYnHInAK0fUkm1EtJ6MkzRmNY9wFAHDxh0WHQlDHYpODmBFZx8IA */
export const EmailMachine = createMachine({
  id: 'email',

  predictableActionArguments: true,
  schema: {
    context: {} as IEmailContext,
    events: {} as TEmailEvents,
    services: {} as TService
  },
  tsTypes: {} as import("./state.typegen").Typegen0,

  context: {
    email: "",
    errorMsg: "",
    valid: false
  },
  
  states: {
    idle: {
      on: {
        "check format": [{
          target: "valid format",
          cond: "format valid"
        }, "error"],

        "type new email": {
          target: "idle",
          internal: true,
          actions: "assign email"
        }
      }
    },

    "valid format": {
      always: "api"
    },

    error: {
      entry: "assign error",

      on: {
        "type new email": {
          target: "idle",
          actions: "assign email"
        }
      }
    },

    api: {
      invoke: {
        src: "check server",
        onDone: "done",
        onError: "error"
      }
    },

    done: {
      on: {
        "type new email": {
          target: "idle",
          actions: "assign email"
        }
      },

      entry: "assign valid"
    }
  },

  initial: "idle"
}, {
  actions: {
    "assign email": assign({
      email: (_, event) => event.email,
      valid: false,
    }),
    "assign error": assign({
      errorMsg: (_, event) => {
        if (event.type === "check format") {
          return "이메일 주소를 입력하세요.";
        } else if (event.type === "error.platform.email.api:invocation[0]") {
          switch(event.data) {
            case "409":
              return "이미 사용 중인 계정 입니다.";
          }
        }

        return "오류; 다른 이메일을 입력해 주세요.";
      }
    }),
    "assign valid": assign({
      valid: true
    })
  },
  guards: {
    "format valid": (context, _) => {
      const validRegex = new RegExp( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

      return validRegex.test(context.email);
    }
  },
  services: {
    "check server": async (context, _) => {
      const { email } = context;

      const status = await fetch('https://kkwy2n35ug.execute-api.ap-northeast-2.amazonaws.com/dev/auth/check-duplication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email
        })
      })
      .then(res => res.status)
      .catch(() => 500)

      if (status !== 200) throw new Error(status.toString());

      return "success";
    }
  }
})