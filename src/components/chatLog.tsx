import { useEffect, useRef, useState } from 'react';
import { getAnswer } from '../api/gpt';
import ChatInput from './chatInput';
import { useAtom } from 'jotai';
import { chatLogAtom } from '../store/chatLog';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import Lottie from 'lottie-react';
import 'highlight.js/styles/a11y-dark.css';
import '../styles/markdown.css';
import loadingAnimation from '../assets/loading.json';

export default function ChatLog() {
  const chatElement = useRef<HTMLDivElement>(null);

  const [textAreaValue, setTextAreaValue] = useState('');
  const [chatLog, setChatLog] = useAtom(chatLogAtom);
  const [dots, setDots] = useState('');
  const [editorKey, setEditorKey] = useState(0); 

  useEffect(() => {
    if (!chatElement.current) return;
    chatElement.current.scrollTo({
      behavior: 'smooth',
      top: chatElement.current.scrollHeight,
    });
  }, [chatLog]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (markdown: string) => {
    setTextAreaValue(markdown);
  };

  const clickButton = async () => {
    if (!textAreaValue.trim()) return;

    setTextAreaValue('');
    setEditorKey((prevKey) => prevKey + 1);

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
    }
  };

  return (
    <div className="w-[888px] flex flex-col mx-auto my-auto p-6 items-center">
      <div
        className="flex flex-col space-y-4 overflow-y-auto h-[calc(100vh-250px)] w-[100%] px-4 mb-32"
        ref={chatElement}
      >
        {chatLog.map((entry, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <div className="flex justify-end">
              <div className="bg-secondary max-w-[680px] min-h-[68px] p-[10px] rounded-lg">
                <ReactMarkdown className="text-white p-3" rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                  {entry.userMessage}
                </ReactMarkdown>
              </div>
            </div>
            <div className="max-w-[660px] justify-start">
              <p className="font-semibold text-white">✨ AI-PRO</p>
              <div className="leading-9">
                {entry.aiResponse === null ? (
                  <div className="flex flex-col items-start">
                    <Lottie animationData={loadingAnimation} className="w-[100px] h-[100px]" loop={true} />
                    <p className="text-white mt-4">답변이 준비중입니다{dots}</p>
                  </div>
                ) : (
                  <ReactMarkdown className="text-white p-3" rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                    {entry.aiResponse}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 flex justify-center mb-5">
        <ChatInput
          key={editorKey}
          textAreaValue={textAreaValue}
          handleChange={handleChange}
          onClickSendButton={clickButton}
        />
      </div>
    </div>
  );
}