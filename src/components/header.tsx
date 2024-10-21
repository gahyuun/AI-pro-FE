import { ReactComponent as Menu } from '../assets/menu.svg';
import { ReactComponent as User } from '../assets/mockUser.svg';
import { SheetContent, SheetTrigger, Sheet } from './ui/sheet';
import SideBar from './sideBar';

export default function Header() {
  return (
    <div className="bg-primary h-[72px] w-[100%] p-4 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-[480px] bg-secondary pt-[56px] border-0">
            <SideBar />
          </SheetContent>
        </Sheet>
        <p className="text-2xl text-white font-bold ">✨ AI-PRO</p>
      </div>
      <User />
    </div>
  );
}
