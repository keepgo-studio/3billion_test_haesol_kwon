import React, { useCallback, useEffect, useState } from 'react'
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import Button from '../../../../components/Button';

export const checkValidation = (val: string | null) => {
  const validRegex = new RegExp(/^[a-z0-9]*$/, 'gi');

  return val && Boolean(validRegex.test(val)) && val.length >= 5;
}

const License = ({
  license,
  onBack,
  onDone
}: {
  license: string | null;
  onBack: () => void;
  onDone: (license: string) => void;
}) => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (checkValidation(license)) {
      setLicenseNumber(license!);
    }
  }, [license])

  const inputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;

    setError(checkValidation(val) ? null : '영문, 숫자로 구성된 5자 이상의 문자열로 입력하세요.');
    setLicenseNumber(val);
  }, [])

  return (
    <section className='w-full h-full max-w-screen-sm flex flex-col py-12 px-2 m-auto'>
    <div className='flex-1'>
      <label>
        <h3 className='text-2xl font-bold mb-8'>면허 번호를 입력하세요</h3>

        <div className='flex-center'>
          <h4 className='w-48'>면허 번호</h4>

          <section className='relative w-full'>
            <input
              minLength={5}
              className={`
                w-full placeholder:font-light focus:placeholder-gray-300 px-3 h-12 rounded-lg shadow-[inset_0_0_0_1px] shadow-gray-300 cursor-pointer 
                hover:shadow-[0_0_2px_1px] hover:shadow-gray-400 hover:placeholder-gray-500
                ${error ? 'shadow-[inset_0_0_0_2px] shadow-red-400 outline-none' : ''}
              `}
              type="text"
              placeholder={error ? '' : '면허 번호를 입력하세요'}
              value={licenseNumber}
              onChange={inputHandler}
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
        onClick={() => {
          if (checkValidation(licenseNumber)) {
            onDone(licenseNumber);
            setError(null);
            return;
          }

          if (licenseNumber === '') {
            setError('면허 번호를 입력하세요.')
          } else {
            setError('영문, 숫자로 구성된 5자 이상의 문자열로 입력하세요.');
          }
        }}
        isDisabled={!checkValidation(licenseNumber)}
      >다음 <LiaAngleRightSolid className='inline-block ml-2 text-xl' /></Button>
    </div>
  </section>
  )
}

export default License