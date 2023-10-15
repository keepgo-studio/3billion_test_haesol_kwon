import React from 'react'
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import Button from '../../../../components/Button';
import { useMachine } from '@xstate/react';
import { EmailMachine } from './state';


const Email = ({
  email,
  onBack,
  onDone
}: {
  email: string | null;
  onBack: () => void;
  onDone: (email: string) => void;
}) => {
  const [current, send] = useMachine(EmailMachine, {
    context: {
      email: email || "",
      errorMsg: "",
      valid: email ? true : false
    }
  });

  const isError = current.matches("error");
  const isLoading = current.matches("valid format") || current.matches("api");
  const isValid = current.context.valid;

  return (
    <section className='w-full h-full max-w-screen-sm flex flex-col py-12 px-2 m-auto'>
      <div className='flex-1'>
        <label>
          <h3 className='text-2xl font-bold mb-8'>계정을 입력하세요.</h3>

          <div className='flex-center'>
            <h4 className='w-48'>이메일 계정</h4>

            <section className='relative w-full flex'>
              <input
                className={`
                  w-full placeholder:font-light focus:placeholder-gray-300 px-3 h-12 rounded-lg shadow-[inset_0_0_0_1px] shadow-gray-300 cursor-pointer 
                  hover:shadow-[0_0_2px_1px] hover:shadow-gray-400 hover:placeholder-gray-500
                  ${isError ? 'shadow-[inset_0_0_0_2px] shadow-red-400 outline-none text-red-400' : ''}
                `}
                type="email"
                placeholder={isError ? '' : '이메일을 입력하세요'}
                value={current.context.email}
                disabled={isLoading}
                onChange={(e) => send({
                  type: "type new email",
                  email: e.target.value
                })}
              />

              <button
                className={`
                  ml-3 w-28 py-3 bg-gray-100 text-gray-400 font-semibold shadow-[inset_0_0_0_1px] shadow-gray-300 rounded-lg
                  duration-300 hover:bg-white hover:text-black
                  ${isValid && 'pointer-events-none'}
                `}
                disabled={isValid}
                onClick={() => send("check format")}
              >{isValid ? '확인 완료' : (isLoading ? "체크 중...": '중복 확인')}</button>
              
              {isError && <p className='absolute top-full text-red-400 text-sm'>{current.context.errorMsg}</p>}
            </section>
          </div>
        </label>
      </div>

      <div className='w-full grid flex-center gap-6'>
        <Button
          theme='gray'
          onClick={() => onBack()}
        ><LiaAngleLeftSolid className='inline-block mr-2 text-xl' />이전</Button>

        <Button
          onClick={() => isValid && onDone(current.context.email)}
          isDisabled={!isValid}
        >다음 <LiaAngleRightSolid className='inline-block ml-2 text-xl' /></Button>
      </div>
    </section>
  )
}

export default Email;