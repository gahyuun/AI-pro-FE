import { useAtom } from "jotai";
import { roleAtom } from "../store/role";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ReactComponent as Send } from "../assets/send.svg";
import { sendChatAtom } from "../store/sendChat";
import { chatLogAtom } from "../store/chatLog";
import { getAnswer } from "../api/gpt";

export default function FirstChat() {
  const [role] = useAtom(roleAtom);
  const [, setIsSend] = useAtom(sendChatAtom);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [, setChatLog] = useAtom(chatLogAtom);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  const slicedRole = role[0]?.slice(0, 40) + "...";

  const onClickSendButton = async () => {
    if (!textAreaValue.trim()) return;

    setIsSend(true);

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { userMessage: textAreaValue, aiResponse: null },
    ]);

    try {
      const response = await getAnswer(textAreaValue, "user1");
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
    <div className="w-[1116px] flex flex-col jusfity-center mx-auto my-auto items-center gap-7">
      {role.length !== 0 ? (
        <div className="flex flex-col items-center">
          <div className="flex gap-3">
            <p className="text-white text-2xl font-medium">{slicedRole} </p>
            <p className="text-white text-2xl font-semibold">
              의 역할이 지정되어 있습니다.
            </p>
          </div>
          <p className="text-white text-2xl font-semibold">
            피드백을 요청할 코드를 입력해주세요.
          </p>
        </div>
      ) : (
        <p className="text-white text-2xl font-semibold">
          AI-PRO에 요청할 피드백과 코드를 입력해주세요.
        </p>
      )}

      <div className="py-5 flex w-[100%]">
        <Textarea
          value={textAreaValue}
          onChange={handleChange}
          placeholder="AI PRO에게 피드백을 요청할 코드를 입력해주세요."
          className="w-[1026px] h-20"
        />
        <Button
          variant="secondary"
          size="icon"
          className="w-[90px] h-20"
          onClick={onClickSendButton}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
