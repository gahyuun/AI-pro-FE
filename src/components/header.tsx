import { ReactComponent as Menu } from '../assets/menu.svg';
import { ReactComponent as User } from '../assets/mockUser.svg';

export default function Header() {
  return (
    <div className="bg-primary h-[72px] w-[100%] p-4 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Menu />
        <p className="text-2xl text-white font-bold ">✨ AI-PRO</p>
      </div>
      <User />
    </div>
  );
}
