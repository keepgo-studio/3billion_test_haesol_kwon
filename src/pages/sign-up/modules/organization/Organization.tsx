import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import Button from '../../../../components/Button';
import { TPosition } from '../../data';


const Item = ({ children }:{children: React.ReactNode}) => (
  <>{children}</>
)

const Snippet = ({
  open = false,
  keyword,
  list,
  onClick
}: {
  open: boolean;
  keyword: string;
  list: Array<string>;
  onClick: (name: string) => void;
}) => {
  type TItem = {
    val: string;
    childs: Array<string | React.ReactNode>;
  };
  
  const [filteredList, setFilteredList] = useState<Array<TItem>>([])

  useEffect(() => {
    const updateFilterList = () => {
      const n = keyword.length;
      const regex = new RegExp(keyword, 'gi');
      const newList: Array<TItem> = [];

      for (const i in list) {
        if (newList.length >= 7) break;

        const orgName = list[i];
        
        let lastIdx = 0;
        const matchedData = [...orgName.matchAll(regex)];

        if (matchedData.length === 0) continue;

        const childs = [];
        matchedData.forEach(info => {
          const prevIdx = lastIdx;
          lastIdx = info.index! + n;
          
          childs.push(orgName.slice(prevIdx, info.index));
          childs.push(<span className='text-red-400'>{orgName.slice(info.index, info.index! + n)}</span>);
        });

        childs.push(orgName.slice(lastIdx));

        newList.push({
          val: orgName,
          childs
        });
      }

      setFilteredList(newList);
    }

    try {
      updateFilterList();
    } catch {
      setFilteredList([]);
    }
  }, [keyword, list])

  return (
    <div className={`w-full relative ${open ? '' : 'hidden'}`}>
      <ul className='absolute p-1 gap-2 translate-y-2 top-full w-full max-h-[200px] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg'>
        {filteredList.map((item, idx) => (
          <li 
            key={item.val}
            className='py-3 px-6 text-base rounded-md cursor-pointer hover:bg-gray-100'
            onClick={() => onClick(item.val)}
          >
            <p>{item.childs.map((_c, _idx) => <Item key={`${idx}-${_idx}`}>{_c}</Item>)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Organization = ({
  position,
  organization,
  onBack,
  onDone
}: {
  position: TPosition | null;
  organization: string | null;
  onBack: () => void;
  onDone: (organization: string) => void;
}) => {
  const [name, setName] = useState("");
  const [snippetList, setSnippetList] = useState<string[] | null>(null);
  const [openSnippet, setOpenSnippet] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const checkValidation = (org: string | null) => {
    return org && org.length > 0;
  }

  useEffect(() => {
    if (position === '의사' || position === '간호사') {
      setSnippetList([]);

      const loadSnippetList = async () => {
        const list = await getHosipitalList();
        setSnippetList(list);
      }

      loadSnippetList();
    }

    if (checkValidation(organization)) {
      setName(organization!);
      setIsValid(true);
    }
  }, [position, organization])

  return (
    <section className='w-full h-full max-w-screen-sm flex flex-col py-12 px-2 m-auto'>
      <div className='flex-1'>
        <h3 className='text-2xl font-bold mb-8'>소속된 기관을 입력하세요</h3>

        <label>
          <div className='flex-center'>
              <h4 className='w-48'>기관명</h4>

            <section className='relative w-full'>
              <div className='absolute text-xl flex-center w-12 h-12'>
                <BiSearch/>
              </div>

              <input
                className={`
                  w-full placeholder:font-light focus:placeholder-gray-300 pl-12 pr-3 h-12 rounded-lg shadow-[inset_0_0_0_1px] shadow-gray-300 cursor-pointer 
                  hover:shadow-[0_0_2px_1px] hover:shadow-gray-400 hover:placeholder-gray-500
                  ${error ? 'shadow-[inset_0_0_0_2px] shadow-red-400 outline-none' : ''}
                `}
                type="text"
                placeholder={error ? '' : '기관명을 입력하세요'}
                value={name}
                onChange={(e) => {
                  const val = e.currentTarget.value;
      
                  setError(null);
                  setName(val);
              
                  if (val.length > 1) {
                    setOpenSnippet(true);
                  } else {
                    setOpenSnippet(false);
                  }

                  if (checkValidation(val)) {
                    setIsValid(true);
                  } else {
                    setIsValid(false);
                  }
                }}
              />

              {error && <p className='absolute top-full text-red-400 text-sm'>{error}</p>}

              {snippetList && (
                <Snippet
                  open={openSnippet}
                  keyword={name}
                  list={snippetList} 
                  onClick={(newName) => {
                    setName(newName);
                    setOpenSnippet(false);
                  }}
                />
              )}
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
            if (isValid) {
              onDone(name);
            }
            else {
              setError('기관명을 입력하세요.')
            }
          }}
          isDisabled={!isValid}
        >다음 <LiaAngleRightSolid className='inline-block ml-2 text-xl' /></Button>
      </div>
    </section>
  )
}

export default Organization;



async function getHosipitalList() {
  return await fetch('https://3billion-public-images.s3.ap-northeast-2.amazonaws.com/organization.txt')
    .then(response => response.text())
    .then(text => text.split('\n'));
}