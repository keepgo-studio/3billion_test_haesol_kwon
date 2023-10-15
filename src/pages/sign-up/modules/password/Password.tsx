import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { BsFillEyeFill } from "react-icons/bs";


const Password = ({
  password,
  onBack,
  onDone
}: {
  password: string | null;
  onBack: () => void;
  onDone: (password: string) => void;
}) => {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState(password ?? '');
  const [visibleOne, setVisibleOne] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);
  const [errorOne, setErrorOne] = useState<string | null>(null);
  const [errorTwo, setErrorTwo] = useState<string | null>(null);
  
  const [isValid, setIsValid] = useState(false);

  const checkValidationOne = (pw: string) => {
    const validRegex = new RegExp(/^[A-Za-z0-9!/@#$%^&*()_+{}[\]:;<>,.?~\\-]{8,16}$/);

    if (validRegex.test(pw)) {
      return true;
    }

    return false;
  }

  const checkValidationTwo = (pw: string) => {
    if (pw === passwordOne) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    setPasswordOne(password ?? '');
    setPasswordTwo(password ?? '');

    if (checkValidationOne(password ?? '')) {
      setIsValid(true);
    }
  }, [password])
  

  return (
    <section className="w-full h-full max-w-screen-sm flex flex-col py-12 px-2 m-auto">
      <div className="flex-1 flex flex-col gap-6">
        <label>
          <h3 className="text-2xl font-bold mb-8">비밀번호를 입력하세요.</h3>

          <div className="flex-center">
            <h4 className="w-48">비밀번호</h4>

            <section className="relative w-full flex">
              <input
                className={`
                w-full placeholder:font-light focus:placeholder-gray-300 pl-3 pr-12 h-12 rounded-lg shadow-[inset_0_0_0_1px] shadow-gray-300 cursor-pointer 
                hover:shadow-[0_0_2px_1px] hover:shadow-gray-400 hover:placeholder-gray-500
                ${errorOne
                    ? "shadow-[inset_0_0_0_2px] shadow-red-400 outline-none text-red-400"
                    : ""
                }
              `}
                type={visibleOne ? "text" : "password"}
                placeholder={errorOne ? "" : "이메일을 입력하세요"}
                value={passwordOne}
                onChange={(e) => {
                  const val = e.target.value;
                  setPasswordOne(val);
                  if (!checkValidationOne(val)) {
                    setErrorOne("8 ~ 16자 영문, 숫자, 특수문자를 입력하세요.");
                  } else {
                    setErrorOne(null);
                  }
                }}
              />

              <div 
                className="absolute cursor-pointer right-0 text-lg text-gray-400 flex-center w-12 h-12"
                onClick={() => setVisibleOne((prev) => !prev)}
              >
                <BsFillEyeFill />
              </div>

              {errorOne && (
                <p className="absolute top-full text-red-400 text-sm">
                  {errorOne}
                </p>
              )}
            </section>
          </div>
        </label>

        <label>
          <div className="flex-center">
            <h4 className="w-48">비밀번호 확인</h4>

            <section className="relative w-full flex">
              <input
                className={`
                w-full placeholder:font-light focus:placeholder-gray-300 px-3 h-12 rounded-lg shadow-[inset_0_0_0_1px] shadow-gray-300 cursor-pointer 
                hover:shadow-[0_0_2px_1px] hover:shadow-gray-400 hover:placeholder-gray-500
                ${errorTwo
                    ? "shadow-[inset_0_0_0_2px] shadow-red-400 outline-none text-red-400"
                    : ""
                }
              `}
                type={visibleTwo ? "text" : "password"}
                placeholder={errorTwo ? "" : "이메일을 입력하세요"}
                value={passwordTwo}
                onChange={(e) => {
                  const val = e.target.value;
                  setPasswordTwo(val);
                  if (!checkValidationTwo(val)) {
                    setErrorTwo("비밀번호가 일치하지 않습니다.");
                  } else {
                    setIsValid(true);
                    setErrorTwo(null);
                  }
                }}
              />

              <div 
                className="absolute cursor-pointer right-0 text-lg text-gray-400 flex-center w-12 h-12"
                onClick={() => setVisibleTwo((prev) => !prev)}
              >
                <BsFillEyeFill />
              </div>

              {errorTwo && (
                <p className="absolute top-full text-red-400 text-sm">
                  {errorTwo}
                </p>
              )}
            </section>
          </div>
        </label>
      </div>

      <div className="w-full grid flex-center gap-6">
        <Button theme="gray" onClick={() => onBack()}>
          <LiaAngleLeftSolid className="inline-block mr-2 text-xl" />
          이전
        </Button>

        <Button
          onClick={() => {
            setIsValid(false);

            if (checkValidationOne(passwordOne)) {
              setErrorOne(null);
            } else {
              setErrorOne("8 ~ 16자 영문, 숫자, 특수문자를 입력하세요.");
              return;
            }

            if (checkValidationTwo(passwordTwo)) {
              setErrorTwo(null);
            } else {
              setErrorTwo("비밀번호가 일치하지 않습니다.");
              return;
            }
            
            setIsValid(true);
            onDone(passwordOne);
          }}
          isDisabled={!isValid}
        >
          다음 <LiaAngleRightSolid className="inline-block ml-2 text-xl" />
        </Button>
      </div>
    </section>
  );
};

export default Password;
