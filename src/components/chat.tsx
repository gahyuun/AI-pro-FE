import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { getAnswer } from "../api/gpt";
import { useAtom } from "jotai";
import { roleAtom } from "../store/role";

interface ChatEntry {
  userMessage: string;
  aiResponse: string | null;
}

export default function Chat() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);
  const [role] = useAtom(roleAtom);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  const clickButton = async () => {
    if (!textAreaValue.trim()) return;

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { userMessage: textAreaValue, aiResponse: null },
    ]);

    try {
      const response = await getAnswer(textAreaValue, "user1", role[0] || "");
      const aiResponse = response.message;

      setChatLog((prevChatLog) => {
        const updatedLog = [...prevChatLog];
        updatedLog[updatedLog.length - 1].aiResponse = aiResponse;
        return updatedLog;
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setTextAreaValue("");
    }
  };

  return (
    <div className="w-[85%] flex flex-col mt-10 p-6 space-y-10">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight ml-16 text-white">
        ✨ AI-PRO
      </h2>
      <div className="flex flex-col p-8 w-[85%] mx-auto my-0 bg-secondary rounded-xl space-y-7">
        <div>
          <p className="font-semibold text-white">🤖 AI 코치</p>
          <p className="font-light text-white p-3">무엇을 도와드릴까요?</p>
        </div>
        {chatLog.map((entry, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <div>
              <p className="font-semibold text-white">🙂 YOU</p>
              <p className="font-light text-white p-3">{entry.userMessage}</p>
            </div>
            <div>
              <p className="font-semibold text-white">🤖 AI 코치</p>
              <p className="font-light text-white p-3">
                {entry.aiResponse === null
                  ? "답변을 준비중입니다..."
                  : entry.aiResponse}
              </p>
            </div>
          </div>
        ))}
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
  );
}
