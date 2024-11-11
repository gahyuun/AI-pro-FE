import { z } from 'zod';

const restrictedUsernames = [
  'admin',
  'administrator',
  'root',
  'superuser',
  'manager',
  'sysadmin',
  'system',
  'server',
  'host',
  'localhost',
  'null',
  'undefined',
  'error',
  'guest',
];

const idSchema = z
  .string()
  .min(1, { message: '아이디를 작성해주세요' })
  .refine((username) => !restrictedUsernames.includes(username.toLowerCase()), {
    message: '사용할 수 없는 아이디 입니다',
  })
  .refine((username) => /^[a-zA-Z0-9]{6,20}$/.test(username), {
    message: '아이디는 6~20자의 영문 혹은 영문과 숫자를 조합해주세요',
  });

const passwordSchema = z
  .string()
  .min(8, { message: '비밀번호는 8자 이상 16자 이내여야 합니다' })
  .max(16, { message: '비밀번호는 8자 이상 16자 이내여야 합니다' })
  .refine((password) => /[a-zA-Z]/.test(password) && /\d/.test(password) && /[\W_]/.test(password), {
    message: '비밀번호에는 영문, 숫자, 특수기호가 모두 포함되어야 합니다',
  });

const nameSchema = z.string().min(1, { message: '이름을 입력해주세요' });

const signUpSchema = z
  .object({
    name: nameSchema,
    id: idSchema,
    password: passwordSchema,
    passwordConfirmation: z.string().min(1, { message: '비밀번호 확인을 해주세요' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignUpPayload = z.infer<typeof signUpSchema>;

export const userSchemas = {
  signUpSchema,
};
