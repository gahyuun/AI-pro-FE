import React, { useState } from 'react';
import { Textarea } from './textarea';
import { Button } from './button';
import { useAtom } from 'jotai';
import { roleAtom } from '../../store/role';

export default function SideBar() {
  const [text, setText] = useState('');
  const [role, setRole] = useAtom(roleAtom);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setRole((prev) => [...prev, text]);
    setText('');
  };

  return (
    <div className="w-[20%] bg-secondary flex flex-col gap-10 p-3">
      <div className="flex flex-col h-[100%] ">
        <h3 className="scroll-m-20  text-white p-4 text-lg font-semibold tracking-tight first:mt-0">
          AI의 역할을 지정하여 더욱 효율적인 코칭을 경험해보세요!
        </h3>
        <div className="flex-grow overflow-auto">
          <div className="flex flex-col gap-4">
            {role.map((value) => (
              <div className="bg-black text-white rounded-md p-2 text-sm">"{value}"의 역할이 부여되었습니다</div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center rounded-xl space-x-4 mt-10 bg-black">
            <Textarea
              placeholder="AI PRO에게 코드를 질문해보세요."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button variant="default" type="submit" className="bg-black text-white h-[100%]">
              전송
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
