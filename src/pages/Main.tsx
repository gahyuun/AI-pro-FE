import SideBar from '../components/sideBar';
import Chat from '../components/chat';

export default function Main() {
  return (
    <div className="flex bg-primary h-screen">
      <SideBar />
      <Chat />
    </div>
  );
}
