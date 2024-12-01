import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { roleAtom } from '../store/role';
import { ReactComponent as Check } from '../assets/check.svg';
import { ReactComponent as X } from '../assets/x.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';
import { Textarea } from './ui/textarea';
import { getChatList, registerRole } from '../api/gpt';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as History } from '../assets/history.svg';
import { ReactComponent as NewChat } from '../assets/newChat.svg';
import { sideBarAtom } from '../store/menu';

export default function SideBar() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useAtom(sideBarAtom);
  const [value, setValue] = useState('');
  const [role, setRole] = useAtom(roleAtom);
  const [typing, setTyping] = useState(false);
  const [chatList, setChatList] = useState<{ catalogId: number; summary: string }[]>([]);

  useEffect(() => {
    setValue(role);
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChatList();
        console.log(data);

        setChatList(
          data.map((v) => {
            return { catalogId: v.catalogId, summary: v.summary };
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRole = async () => {
    const role = await registerRole(value);
    setRole(role);
    setTyping(false);
  };
  return (
    <section className="flex flex-col gap-[16px]">
      <div
        className="flex text-white text-[14px] font-bold  items-center gap-2 py-[6px] cursor-pointer hover:bg-primary/50  rounded-lg"
        onClick={() => {
          navigate('/chat');
          setSideBar(false);
        }}
      >
        <NewChat />
        새로운 채팅 시작
      </div>
      <div className="mb-[20px]">
        <div className="flex items-center justify-between">
          {role !== '' ? (
            <p className="text-white text-sm py-2">아래의 내용이 AI-PRO의 역할로 지정되어 있습니다.</p>
          ) : (
            <p className="text-white text-sm py-2">AI-PRO의 역할이 지정되어 있지 않습니다.</p>
          )}

          {typing ? (
            <div className="flex gap-2">
              <Check className="cursor-pointer" onClick={handleRole} data-testid="check-icon" />
              <X
                className="cursor-pointer"
                onClick={() => {
                  setTyping(false);
                }}
              />
            </div>
          ) : (
            <Edit
              className="cursor-pointer"
              onClick={() => {
                setTyping(true);
              }}
              data-testid="edit-icon"
            ></Edit>
          )}
        </div>
        <Textarea
          readOnly={!typing}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <div className="h-[1px] self-stretch bg-[#A1A1AA]"></div>
      <div>
        <div className="flex text-white text-[14px] font-bold  items-center gap-2">
          <History /> 최근 기록
        </div>
        {chatList.map((chat) => (
          <div
            className="text-white py-[20px] px-[12px] cursor-pointer hover:bg-primary/50 rounded-lg"
            onClick={() => {
              navigate(`/chat/${chat.catalogId}`);
              setSideBar(false);
            }}
            data-testid={`chat-${chat.catalogId}`}
          >
            {chat.summary}
          </div>
        ))}
      </div>
    </section>
  );
}
