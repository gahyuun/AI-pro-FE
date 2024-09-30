import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { getAnswer } from '../api/gpt';
import SideBar from '../components/ui/sideBar';

export default function Main() {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  const clickButton = async () => {
    setIsLoading(true);
    const data = await getAnswer(textAreaValue);
    setAnswer(data);
    setIsLoading(false);
  };

  return (
    <div className="flex h-[100vh] bg-primary">
      <div className="w-[85%] flex flex-col mt-10 p-6 space-y-10">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight ml-16 text-white">✨ AI-PRO</h2>
        <div className="flex flex-col p-8 w-[85%] mx-auto my-0 bg-secondary rounded-xl">
          <div className="flex flex-col space-y-7">
            <div>
              <p className="font-semibold text-white">🤖 AI 코치 </p>
              {/*<p>{isLoading ? "답변을 준비중입니다..." : answer}</p>*/}
              <p className="font-light text-white p-3">무엇을 도와드릴까요?</p>
            </div>
            <div>
              <p className="font-semibold text-white">🙂 YOU</p>
              <p className="font-light text-white p-3">파이썬이 뭐야?</p>
            </div>
          </div>
          <div className="flex items-center rounded-xl space-x-4 mt-10 bg-black">
            <Textarea value={textAreaValue} onChange={handleChange} placeholder="AI PRO에게 코드를 질문해보세요." />

            <Button variant="default" className="bg-black text-white h-[100%]" onClick={clickButton}>
              질문하기
            </Button>
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}
