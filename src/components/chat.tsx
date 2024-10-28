import { useAtom } from 'jotai';
import { roleAtom } from '../store/role';
import { useEffect, useState } from 'react';
import { sendChatAtom } from '../store/sendChat';
import { chatLogAtom } from '../store/chatLog';
import { getAnswer } from '../api/gpt';
import ChatInput from './chatInput';
import ChatLog from './chatLog';

export default function Chat() {
  const [role] = useAtom(roleAtom);
  const [isSend, setIsSend] = useAtom(sendChatAtom);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [, setChatLog] = useAtom(chatLogAtom);

  const handleChange = (markdown: string) => {
    setTextAreaValue(markdown);
  };

  useEffect(() => {
    setIsSend(false);
  }, [setIsSend]);

  const slicedRole = role.length > 30 ? role.slice(0, 30) + '...' : role;

  const onClickSendButton = async () => {
    if (!textAreaValue.trim()) return;

    setIsSend(true);

    setChatLog((prevChatLog) => [...prevChatLog, { userMessage: textAreaValue, aiResponse: null }]);

    try {
      const response = await getAnswer(textAreaValue, 'user1');
      const aiResponse = response.message;

      setChatLog((prevChatLog) => {
        const updatedLog = [...prevChatLog];
        updatedLog[updatedLog.length - 1].aiResponse = aiResponse;
        return updatedLog;
      });
    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setTextAreaValue('');
    }
  };

  return (
    <>
      {isSend ? (
        <ChatLog />
      ) : (
        <div className="w-[1116px] flex flex-col jusfity-center mx-auto my-auto items-center gap-7">
          {role.length !== 0 ? (
            <div className="flex flex-col items-center">
              <div className="flex gap-3">
                <p className="text-white text-2xl font-medium">{slicedRole} </p>
                <p className="text-white text-2xl font-semibold">의 역할이 지정되어 있습니다.</p>
              </div>
              <p className="text-white text-2xl font-semibold">피드백을 요청할 코드를 입력해주세요.</p>
            </div>
          ) : (
            <p className="text-white text-2xl font-semibold">AI-PRO에 요청할 피드백과 코드를 입력해주세요.</p>
          )}
          <div className="flex justify-center mb-5">
            <ChatInput
              textAreaValue={textAreaValue}
              handleChange={handleChange}
              onClickSendButton={onClickSendButton}
            />
          </div>
        </div>
      )}
    </>
  );
}
