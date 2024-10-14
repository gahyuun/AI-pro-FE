import SideBar from "../components/sideBar";
import Chat from "../components/chat";
import Header from "../components/header";

export default function Main() {
  return (
    <div className="flex flex-col bg-primary min-h-[100vh]">
      <Header />
      <Chat />
      {/*<SideBar />*/}
    </div>
  );
}
