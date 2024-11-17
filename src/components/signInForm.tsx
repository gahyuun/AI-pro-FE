import { userSchemas, SignInPayload } from '../utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { Form } from './ui/form';
import { RHFInput } from './ui/RHFInput';
import { Button } from './ui/button';
import { IdInput } from './ui/idInput';
import { checkDuplicate, signIn } from '../api/user';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export function SignInForm() {
  const [step, setStep] = useState<'id' | 'password'>('id');
  const [idError, setIdError] = useState<string | null>(null);
  const [pwError, setPwError]= useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] =  useCookies(['accessToken']);

  const navigate = useNavigate();

  const form = useForm<SignInPayload>({
    mode: 'onChange',
    resolver: zodResolver(userSchemas.signInSchema),
  });

  const id = useWatch({ control: form.control, name: 'id' });
  const password = useWatch({ control: form.control, name: 'password' });

  const validateAndProceed = async () => {
    try {
      const isDuplicate = await checkDuplicate(id);

      if (isDuplicate) {
        setIdError('AI-PRO에 등록되지 않은 아이디입니다');
        return;
      }

      setIdError(null); // 에러 메시지 초기화
      setStep('password'); // 비밀번호 단계로 이동
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (data: SignInPayload) => {
    try {
      const token = await signIn({
        userid: data.id,
        password: data.password,
      });
      setPwError(null);
      setCookie('accessToken', token, { path: '/'});
      navigate('/chat');
    } catch (error) {
        setPwError('비밀번호가 일치하지 않습니다.');
    }
  };

  const isIdValid = !!id && !form.formState.errors.id;
  const isPasswordValid = !!password && !form.formState.errors.password;

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <IdInput
              name="id"
              label="아이디"
              placeholder="아이디를 입력해 주세요"
              errorMsg={idError || form.formState.errors.id?.message || ''}
              showDuplicateCheck={false}
            />
            {step === 'id' && (
              <Button
                type="button"
                className="w-full bg-[#93C5FD] text-white hover:bg-[#489af7] focus:bg-[#93C5FD]"
                disabled={!isIdValid}
                onClick={validateAndProceed}
              >
                다음
              </Button>
            )}
          </div>
          {step === 'password' && (
            <div className="grid gap-2">
              <RHFInput
                name="password"
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                errorMsg={pwError || form.formState.errors.password?.message || ''}
              />
              <Button
                type="submit"
                className="w-full bg-[#93C5FD] text-white hover:bg-[#489af7] focus:bg-[#93C5FD]"
                disabled={!isPasswordValid}
              >
                로그인
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}