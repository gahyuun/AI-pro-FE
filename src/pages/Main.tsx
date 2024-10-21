import Chat from '../components/chat';
import Header from '../components/header';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';

export default function Main() {
  return (
    <div className="flex flex-col bg-primary min-h-[100vh]">
      <Header />
      <Chat />
    </div>
  );
}
