
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "assign email": "이메일 입력하기";
"assign license": "면허 번호 입력하기";
"assign organization": "소속 기관 입력하기";
"assign password": "비밀번호 입력하기";
"assign position": "직무 선택하기";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "면허 있음": "back" | "소속 기관 입력하기";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "done" | "닉네임" | "면허 번호" | "비밀번호" | "소속 기관" | "이메일" | "직무";
        tags: never;
      }
  