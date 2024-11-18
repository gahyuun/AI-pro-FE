import { userSchemas, SignUpPayload } from '../utils/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { Form } from './ui/form';
import { RHFInput } from './ui/RHFInput';
import { Button } from './ui/button';
import { IdInput } from './ui/idInput';
import { signUp } from '../api/user';
import { useNavigate } from 'react-router-dom';

export function SignUpForm() {
  const form = useForm<SignUpPayload>({
    mode: 'onChange',
    resolver: zodResolver(userSchemas.signUpSchema),
  });
  const navigate = useNavigate();

  const password = useWatch({ control: form.control, name: 'password' });
  const passwordConfirmation = useWatch({ control: form.control, name: 'passwordConfirmation' });

  const handleFormSubmit = (data: SignUpPayload) => {
    try {
      signUp({
        userid: data.id,
        password: data.password,
        username: data.name,
      });
      alert('회원가입에 성공했습니다');
      navigate('/sign-in');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <IdInput
              name="id"
              label="아이디"
              placeholder="6~20자의 영문 혹은 영문과 숫자를 조합"
              errorMsg={form.formState.errors.id?.message ?? ''}
            />
          </div>
          <div className="grid gap-2">
            <RHFInput
              name="password"
              label="비밀번호"
              type="password"
              placeholder="8~16자의 영문, 숫자, 특수기호를 모두 포함"
              errorMsg={form.formState.errors.password?.message ?? ''}
            />
          </div>
          <div className="grid gap-2">
            <RHFInput
              name="passwordConfirmation"
              label="비밀번호 확인"
              type="password"
              placeholder="입력하신 비밀번호를 한번 더 입력해 주세요"
              errorMsg={'비밀번호가 일치하지 않습니다'}
              validate={passwordConfirmation === undefined || password === passwordConfirmation}
            />
          </div>
          <div className="grid gap-2">
            <RHFInput
              name="name"
              label="이름"
              placeholder="이름을 입력해주세요"
              errorMsg={form.formState.errors.name?.message ?? ''}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#93C5FD] text-white hover:bg-[#489af7] focus:bg-[#93C5FD]"
            disabled={!(form.formState.isValid && password === passwordConfirmation)}
          >
            완료
          </Button>
        </div>
      </form>
    </Form>
  );
}
