import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

export default function Main() {
  const [question, setQuestion] = useState<string[]>([]);
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  const clickButton = () => {
    setQuestion((prev) => [...prev, textAreaValue]);
  };

  return (
    <div className="flex h-[100vh]">
      <div className="w-[15%] bg-gray-100 flex flex-col gap-7 p-3">
        <h1 className="scroll-m-20 text-3xl font-bold lg:text-5xl">AI-PRO</h1>
        <div className="flex flex-col">
          <h3 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
            AI-PRO란?
          </h3>
          <div className="text-sm">
            AI-PRO와 함께하는 것은 프로그래밍 여정에 도움이 되는 조수를 두는
            것과 같습니다.
            <br />
            <br /> 개선 사항을 관찰하고, 학습하고, 제안하여 코딩을 더욱
            효율적이고 즐겁게 만듭니다.
            <br />
            <br />
            AI-PRO는 여러분을 든든하게 지원하고, 더 나은 프로그래머가 되도록
            도와드립니다!
          </div>
        </div>
      </div>
      <div className="w-[85%] flex flex-col mt-10 p-6">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight ml-10">
          무엇을 도와드릴까요?
        </h2>
        <div className="flex flex-col px-[100px] py-[30px] gap-2">
          <Textarea
            value={textAreaValue}
            onChange={handleChange}
            placeholder="AI PRO에게 코드를 질문해보세요."
          />
          <div className="self-end">
            <Button variant="default" onClick={clickButton}>
              질문하기
            </Button>
          </div>
        </div>
        <div className="bg-gray-100 m-[90px] p-6 rounded-xl">
          {question.map((q, index) => (
            <div key={index} className="flex flex-col gap-5 mt-5 mb-5">
              <div className="font-semibold">
                질문:
                <div className="font-light w-[100%] bg-white mt-3 rounded-md p-3">
                  {q}
                </div>
              </div>
              <p className="font-semibold">답변: </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
