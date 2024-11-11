import { SignUpForm } from '../components/signUpForm';

export default function SignUp() {
  return (
    <div className="flex flex-col bg-primary min-h-[100vh]">
      <div className="bg-primary h-[72px] w-[100%] p-4 flex items-center justify-between">
        <p className="text-2xl text-white font-bold ">✨ AI-PRO</p>
      </div>
      <div className="justify-center items-center my-auto flex gap-[200px]">
        <div className="text-white font-bold text-[30px] text-center">
          회원가입하고 AI-PRO와
          <br />
          함께 성장해보세요
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
