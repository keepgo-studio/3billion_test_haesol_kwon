import React, { useEffect, useState } from 'react'
import Button from '../../../../components/Button'
import { LiaAngleRightSolid } from 'react-icons/lia'
import { POSITION_LIST, TPosition } from '../../data'


const Position = ({
  position,
  onDone
}: {
  position: TPosition | null;
  onDone: (selectPosition: TPosition) => void;
}) => {
  const [selectIdx, setSelectIdx] = useState<number | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const idx = POSITION_LIST.findIndex(_p => _p === position);
    if (idx >= 0) {
      setSelectIdx(idx);
      setIsValid(true);
    }

  }, [position])

  return (
    <section className='w-full h-full max-w-screen-sm flex flex-col py-12 px-2 m-auto'>
      <div className='flex-1'>
        <h3 className='text-2xl font-bold mb-8'>해당하는 직무를 선택하세요</h3>

        <ul className='grid grid-cols-2 gap-3'>
        {POSITION_LIST.map((position, index) => (
          <li 
            className={`
              duration-300 
              shadow-[inset_0_0_0_1px] shadow-gray-300
              py-3 
              text-base
              flex-center 
              rounded-md
              cursor-pointer 
              ${selectIdx === index ? 'bg-pslate font-bold shadow-[inset_0_0_0_2px] !shadow-black': 'hover:text-pblue hover:border-pblue'}
            `}
            key={position}
            onClick={() => {
              setSelectIdx(index);
              setIsValid(true);
            }}
          >{position}</li>
        ))}
        </ul>
      </div>

      <div className='w-full grid flex-center'>
        <Button
          onClick={() => {
            if (isValid) {
              onDone(POSITION_LIST[selectIdx!]);
            }
            else {
              alert("최소 하나를 골라주십시오")
            }
          }}
          isDisabled={!isValid}
        >다음 <LiaAngleRightSolid className='inline-block ml-2 text-xl' /></Button>
      </div>
    </section>
  )
}

export default Position