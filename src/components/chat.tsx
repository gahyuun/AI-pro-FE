import { useAtom } from 'jotai';
import { roleAtom } from '../store/role';
import { chatLogAtom } from '../store/chatLog';
import { getChatLog, getAnswer } from '../api/gpt';
import ChatInput from './chatInput';
import ChatLog from './chatLog';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Chat() {
  const { id: catalogId } = useParams();
  const [role] = useAtom(roleAtom);
  const [firstQuestion, setFirstQuestion] = useState(!catalogId); // id가 없으면 true
  const [textAreaValue, setTextAreaValue] = useState('');
  const [, setChatLog] = useAtom(chatLogAtom);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (catalogId) {
      const fetchChatHistory = async () => {
        try {
          const logs = await getChatLog(Number(catalogId));

          const formattedLogs = logs.map((log: { question: string, response: string }) => ({
            userMessage: log.question,
            aiResponse: log.response,
          }));

          setChatLog(formattedLogs);
          setFirstQuestion(false);
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      };
      fetchChatHistory();
    }
  }, [catalogId, setChatLog]);

  const handleChange = (markdown: string) => {
    setTextAreaValue(markdown);
  };

  const onClickSendButton = async () => {
    if (!textAreaValue.trim()) return;

    setFirstQuestion(false);
    setTextAreaValue('');
    setEditorKey((prevKey) => prevKey + 1);

    setChatLog((prevChatLog) => [...prevChatLog, { userMessage: textAreaValue, aiResponse: null }]);

    try {
      const response = await getAnswer(textAreaValue, catalogId ? Number(catalogId) : undefined);
      const aiResponse = response.message;
      const newCatalogId = response.catalogId;

      setChatLog((prevChatLog) => {
        const updatedLog = [...prevChatLog];
        updatedLog[updatedLog.length - 1].aiResponse = aiResponse;
        return updatedLog;
      });

      if (newCatalogId && !catalogId) {
        window.history.pushState({}, '', `/chat/${newCatalogId}`);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  const slicedRole = role.length > 30 ? role.slice(0, 30) + '...' : role;

  return (
    <>
      {firstQuestion ? (
        <div className="w-[1116px] flex flex-col justify-center mx-auto my-auto items-center gap-7">
          {role.trim().length !== 0 ? (
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
              key={editorKey}
              textAreaValue={textAreaValue}
              handleChange={handleChange}
              onClickSendButton={onClickSendButton}
            />
          </div>
        </div>
      ) : (
        <ChatLog />
      )}
    </>
  );
}