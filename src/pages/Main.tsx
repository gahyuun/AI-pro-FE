import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { getAnswer } from "../api/gpt";

export default function Main() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [answer, setAnswer] = useState("");
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
      <div className="w-[15%] bg-gray-100 flex flex-col gap-10 p-3">
        <h1 className="scroll-m-20 text-3xl font-bold lg:text-5xl mt-5 ">
          AI-PRO
        </h1>
        <div className="flex flex-col">
          <h3 className="scroll-m-20  pb-2 text-xl font-semibold tracking-tight first:mt-0">
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
            도와주는 AI입니다!
          </div>
        </div>
      </div>
      <div className="w-[85%] flex flex-col mt-10 p-6 space-y-10">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight ml-16 text-white">
          ✨ AI-PRO
        </h2>
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
            <Textarea
              value={textAreaValue}
              onChange={handleChange}
              placeholder="AI PRO에게 코드를 질문해보세요."
            />

            <Button
              variant="default"
              className="bg-black text-white h-[100%]"
              onClick={clickButton}
            >
              질문하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
