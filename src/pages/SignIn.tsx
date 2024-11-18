import { SignInForm } from '../components/signInForm';

export default function SignIn() {
  return (
    <div className="flex flex-col bg-primary min-h-[100vh]">
      <div className="bg-primary h-[72px] w-[100%] p-4 flex items-center justify-between">
        <p className="text-2xl text-white font-bold ">✨ AI-PRO</p>
      </div>
      <div className="justify-center items-center my-auto flex flex-col">
        <div className="text-white font-bold text-[36px] text-center mb-[60px]">
          AI-PRO와 함께하세요
        </div>
        <SignInForm/>
      </div>
    </div>
  );
}
