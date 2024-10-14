import SideBar from "../components/sideBar";
import Header from "../components/header";
import Chat from "../components/chat";

export default function Main() {
  return (
    <div className="flex flex-col bg-primary min-h-[100vh]">
      <Header />
      <Chat />
      {/*<SideBar />*/}
    </div>
  );
}
