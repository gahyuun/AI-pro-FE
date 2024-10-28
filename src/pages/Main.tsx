import { useEffect } from 'react';
import Chat from '../components/chat';
import Header from '../components/header';
import { getRole } from '../api/gpt';
import { useSetAtom } from 'jotai';
import { roleAtom } from '../store/role';

export default function Main() {
  const setRole = useSetAtom(roleAtom);
  async function fetchData() {
    const data = (await getRole()) as string;
    setRole(data);
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col bg-primary min-h-[100vh]">
      <Header />
      <Chat />
    </div>
  );
}
