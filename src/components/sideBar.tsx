import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { roleAtom } from '../store/role';
import { ReactComponent as Check } from '../assets/check.svg';
import { ReactComponent as X } from '../assets/x.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';
import { Textarea } from './ui/textarea';
import { getRole, registerRole } from '../api/gpt';

export default function SideBar() {
  const [value, setValue] = useState('');
  const [role, setRole] = useAtom(roleAtom);
  const [typing, setTyping] = useState(false);
  async function fetchData() {
    const data = (await getRole()) as string;
    setValue(data);
    setRole(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleRole = async () => {
    const role = await registerRole(value);
    setValue(role);
    setRole(role);
    setTyping(false);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        {role !== '' ? (
          <p className="text-white text-sm py-2">아래의 내용이 AI-PRO의 역할로 지정되어 있습니다.</p>
        ) : (
          <p className="text-white text-sm py-2">AI-PRO의 역할이 지정되어 있지 않습니다.</p>
        )}

        {typing ? (
          <div className="flex gap-2">
            <Check className="cursor-pointer" onClick={handleRole} />
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
    </>
  );
}
