import React from 'react';
import { Textarea } from './textarea';
import { Button } from './button';

export default function SideBar() {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // 여기에 form 제출 로직을 추가합니다.
    console.log('Form submitted');
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (even) => {
    // if (event.key === 'Enter' && !event.shiftKey) {
    //   event.preventDefault();
    //   event.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
    // }
  };

  return (
    <div className="w-[20%] bg-secondary flex flex-col gap-10 p-3">
      <div className="flex flex-col h-[100%] ">
        <h3 className="scroll-m-20  text-white p-4 text-lg font-semibold tracking-tight first:mt-0">
          AI의 역할을 지정하여 더욱 효율적인 코칭을 경험해보세요!
        </h3>
        <div className="flex-grow" />
        <form onSubmit={handleSubmit}>
          <div className="flex items-center rounded-xl space-x-4 mt-10 bg-black">
            <Textarea placeholder="AI PRO에게 코드를 질문해보세요." />
            <Button variant="default" className="bg-black text-white h-[100%]" onClick={() => {}}>
              질문하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
