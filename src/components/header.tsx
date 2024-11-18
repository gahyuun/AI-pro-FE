import { ReactComponent as Menu } from '../assets/menu.svg';
import { ReactComponent as User } from '../assets/mockUser.svg';
import { SheetContent, SheetTrigger, Sheet } from './ui/sheet';
import SideBar from './sideBar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const handleLogout = () => {
    removeCookie('accessToken');
    navigate('/sign-in');
  }
  return (
    <div className="bg-primary h-[72px] w-[100%] p-4 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-[480px] bg-secondary pt-[56px] border-0 overflow-y-scroll">
            <SideBar />
          </SheetContent>
        </Sheet>
        <p className="text-2xl text-white font-bold">✨ AI-PRO</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <User />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-24 bg-customBlack text-white shadow-lg border-none mt-1 mr-1">
          <DropdownMenuItem onClick={() => handleLogout()} className="cursor-pointer">
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}