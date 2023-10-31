import React from "react";
import { useMachine } from "@xstate/react";
import { SignUpMachine } from "./state";
import Position from "./modules/position/Position";
import Organization from "./modules/organization/Organization";
import License from "./modules/license/License";
import Email from "./modules/email/Email";
import Password from "./modules/password/Password";

const Navbar = () => {
  return (
    <nav className="flex-center h-20 bg-primary text-2xl font-semibold text-white">
      <span>회원 가입</span>
    </nav>
  );
};

/**
 * 
 * @description
 * 
 * scenario 1
 * 
 * 직무 순서가 바뀌는 경우
 */


const SignUp = () => {
  const [current, send] = useMachine(SignUpMachine);
  const renderCurrent = () => {
    if (current.matches("직무")) {
      return (
        <Position
          position={current.context.position}
          onDone={(position) =>
            send({
              type: "직무 선택하기",
              value: position,
            })
          }
        />
      );
    } else if (current.matches("소속 기관")) {
      return (
        <Organization
          position={current.context.position}
          organization={current.context.organization}
          onBack={() => send("back")}
          onDone={(organization) =>
            send({
              type: "소속 기관 입력하기",
              value: organization,
            })
          }
        />
      );
    } else if (current.matches("면허 번호")) {
      return (
        <License
          license={current.context.license}
          onBack={() => send("back")}
          onDone={(license) =>
            send({
              type: "면허 번호 입력하기",
              value: license,
            })
          }
        />
      );
    } else if (current.matches("이메일")) {
      return (
        <Email
          email={current.context.email}
          onBack={() => send("back")}
          onDone={(email) =>
            send({
              type: "이메일 입력하기",
              value: email,
            })
          }
        />
      );
    } else if (current.matches("비밀번호")) {
      return (
        <Password
          password={current.context.password}
          onBack={() => send("back")}
          onDone={(password) =>
            send({
              type: "비밀번호 입력하기",
              value: password,
            })
          }
        />
      );
    } else if (current.matches("done")) {
      return (
        <section className="flex-center h-full w-full">
          <div className="flex-center flex-col">
            <img src="/house.png" alt="hero" />

            <h2 className="mb-6 text-center text-2xl font-bold">
              조금만 기다려 주세요
              <br />
              마지막으로 내부 승인 절차를 진행하고 있습니다.
            </h2>

            <div className="flex-center w-[632px] flex-col bg-gray-100 py-6 text-sm">
              <p className="">
                1일(영업일) 이내에 승인 여부에 관한 메일이 발송됩니다.
              </p>
              <p>승인이 완료되면 포털에 로그인 할 수 있습니다.</p>
            </div>
          </div>
        </section>
      );
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col">
      <Navbar />

      <section className="flex-1">{renderCurrent()}</section>
    </main>
  );
};

export default SignUp;
