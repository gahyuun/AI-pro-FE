import { useState } from "react";
import { getAnswer } from "../api/gpt";
import ChatInput from "./chatInput";
import { useAtom } from "jotai";
import { chatLogAtom } from "../store/chatLog";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/a11y-dark.css";
import "../styles/markdown.css"

export default function ChatLog() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [chatLog, setChatLog] = useAtom(chatLogAtom);

  const handleChange = (markdown:string) => {
    setTextAreaValue(markdown);
  };

  const clickButton = async () => {
    if (!textAreaValue.trim()) return;

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
    <div className="w-[888px] flex flex-col mx-auto my-auto p-6 items-center">
      <div className="flex flex-col space-y-4 overflow-y-auto h-[calc(100vh-250px)] w-[100%] px-4 mb-32">
        {chatLog.map((entry, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <div className="flex justify-end">
              <div className="bg-secondary max-w-[680px] min-h-[68px] p-[10px] rounded-lg">
              <ReactMarkdown
                  className="text-white p-3"
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                >
                  {entry.userMessage}
                </ReactMarkdown>
              </div>
            </div>
            <div className="max-w-[660px] justify-start">
              <p className="font-semibold text-white">✨ AI-PRO</p>
              <div className="leading-9">
                <ReactMarkdown
                  className="text-white p-3"
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                >
                  {entry.aiResponse === null
                    ? "답변을 준비중입니다..."
                    : entry.aiResponse}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 w-[1000px] flex justify-center mb-5">
        <ChatInput
          textAreaValue={textAreaValue}
          handleChange={handleChange}
          onClickSendButton={clickButton}
          size="small"
        />
      </div>
    </div>
  );
}
