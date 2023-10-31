import React, { useEffect, useState } from 'react'
import Button from '../../../../components/Button';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';

export const checkValidation = (name: string | null) => {
  return Boolean(name);
}

const Nickname = ({
  nickname,
  onBack,
  onDone
}: {
  nickname: string | null;
  onBack: () => void;
  onDone: (nickname: string) => void;
}) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(nickname ?? '');
  }, [nickname])

  return (
    <section className='w-full h-full max-w-screen-sm flex flex-col py-12 px-2 m-auto'>
      <div className='flex-1'>
        <label>
          <h3 className='text-2xl font-bold mb-8'>별칭을 입력하세요.</h3>

          <div className='flex-center'>
            <h4 className='w-48'>별칭</h4>

            <section className='relative w-full flex'>
              <input
                className={`
                  w-full placeholder:font-light focus:placeholder-gray-300 px-3 h-12 rounded-lg shadow-[inset_0_0_0_1px] shadow-gray-300 cursor-pointer 
                  hover:shadow-[0_0_2px_1px] hover:shadow-gray-400 hover:placeholder-gray-500
                  ${error ? 'shadow-[inset_0_0_0_2px] shadow-red-400 outline-none text-red-400' : ''}
                `}
                type="text"
                placeholder={error ? '' : '별칭을 입력하세요'}
                value={name}
                onChange={(e) => {
                  const val = e.target.value;
                  setName(val);
                  setError(checkValidation(val) ? null : "no empty string");
                }}
              />
              
              {error && <p className='absolute top-full text-red-400 text-sm'>{error}</p>}
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
          onClick={() => !error && onDone(name)}
          isDisabled={Boolean(error !== null)}
        >다음 <LiaAngleRightSolid className='inline-block ml-2 text-xl' /></Button>
      </div>
    </section>
  )
}

export default Nickname