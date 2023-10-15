import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { BsFillEyeFill } from "react-icons/bs";


export const checkFormatValidation = (pw: string) => {
  const validRegex = new RegExp(/^[A-Za-z0-9!/@#$%^&*()_+{}[\]:;<>,.?~\\-]{8,16}$/);

  return pw && Boolean(validRegex.test(pw));
}

export const checkPasswordValidation = (pw1:string, pw2: string) => {
  return pw1 === pw2;
}


function usePasswordInput(initVal = '') {
  const [password, setPassword] = useState(initVal);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>('init');

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, compare?: string) => {
    const newPassword = e.target.value;
    
    setPassword(newPassword);
    
    if (compare && !checkPasswordValidation(newPassword, compare)) {
      setError("비밀번호가 일치하지 않습니다.");
    }
    else if (!checkFormatValidation(newPassword)) {
      setError("8 ~ 16자 영문, 숫자, 특수문자를 입력하세요.");
    } else {
      setError(null);
    }
  };

  const isWrongPassword = () => {
    return error && error !== 'init';
  }

  return {
    password,
    setPassword,
    visible,
    setVisible,
    error,
    setError,
    toggleVisibility,
    handleChange,
    isWrongPassword
  };
}

const Password = ({
  password,
  onBack,
  onDone
}: {
  password: string | null;
  onBack: () => void;
  onDone: (password: string) => void;
}) => {
  const pwOne = usePasswordInput('');
  const pwTwo = usePasswordInput('');

  useEffect(() => {
    if (password) {
      pwOne.setPassword(password);
      pwTwo.setPassword(password);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                ${pwOne.isWrongPassword()
                    ? "shadow-[inset_0_0_0_2px] shadow-red-400 outline-none text-red-400"
                    : ""
                }
              `}
                type={pwOne.visible ? "text" : "password"}
                placeholder={pwOne.isWrongPassword() ? "" : "이메일을 입력하세요"}
                value={pwOne.password}
                onChange={pwOne.handleChange}
              />

              <div 
                className="absolute cursor-pointer right-0 text-lg text-gray-400 flex-center w-12 h-12"
                onClick={pwOne.toggleVisibility}
              >
                <BsFillEyeFill />
              </div>

              {pwOne.isWrongPassword() && (
                <p className="absolute top-full text-red-400 text-sm">
                  {pwOne.error}
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
                ${pwTwo.isWrongPassword()
                    ? "shadow-[inset_0_0_0_2px] shadow-red-400 outline-none text-red-400"
                    : ""
                }
              `}
                type={pwTwo.visible ? "text" : "password"}
                placeholder={pwTwo.isWrongPassword() ? "" : "이메일을 입력하세요"}
                value={pwTwo.password}
                onChange={(e) => pwTwo.handleChange(e, pwOne.password)}
              />

              <div 
                className="absolute cursor-pointer right-0 text-lg text-gray-400 flex-center w-12 h-12"
                onClick={pwTwo.toggleVisibility}
              >
                <BsFillEyeFill />
              </div>

              {pwTwo.isWrongPassword() && (
                <p className="absolute top-full text-red-400 text-sm">
                  {pwTwo.error}
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
          onClick={() => (!pwOne.isWrongPassword() && !pwTwo.isWrongPassword()) && onDone(pwOne.password)}
          isDisabled={Boolean(pwOne.isWrongPassword() || pwTwo.isWrongPassword())}
        >
          다음 <LiaAngleRightSolid className="inline-block ml-2 text-xl" />
        </Button>
      </div>
    </section>
  );
};

export default Password;
