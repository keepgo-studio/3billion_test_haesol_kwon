
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.email.api:invocation[0]": { type: "done.invoke.email.api:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.email.api:invocation[0]": { type: "error.platform.email.api:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "check server": "done.invoke.email.api:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "assig valid": "done.invoke.email.api:invocation[0]";
"assign email": "type new email";
"assign error": "check format" | "error.platform.email.api:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "format valid": "check format";
        };
        eventsCausingServices: {
          "check server": "";
        };
        matchesStates: "api" | "done" | "error" | "idle" | "valid format";
        tags: never;
      }
  