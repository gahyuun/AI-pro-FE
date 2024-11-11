import { FormControl, FormField, FormItem, FormLabel } from './form';

import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from './input';
import { Button } from './button';
import { checkDuplicate } from '../../api/user';

interface idInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  errorMsg: string;
}
export function IdInput({ name, label, placeholder, type, errorMsg }: idInputProps) {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const form = useFormContext();
  const id = useWatch({ control: form.control, name: 'id' });
  const validateId = async () => {
    // const data = await checkDuplicate(id);
    // if (data) {
    //   setIsDuplicate(true);
    // }
    setIsDuplicate(true);
  };

  useEffect(() => {
    if (isDuplicate) setIsDuplicate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center w-[390px] h-[24px]">
            <FormLabel className="text-white">{label}</FormLabel>
          </div>
          <div className="flex items-center justify-center gap-3">
            <FormControl>
              <Input placeholder={placeholder} {...field} type={type} />
            </FormControl>
            <Button
              type="button"
              className="bg-[#93C5FD] hover:bg-[#93C5FD]"
              onClick={validateId}
              disabled={errorMsg !== '' || id === undefined}
            >
              중복확인
            </Button>
          </div>

          <div className="text-[#FECACA]">{errorMsg ? errorMsg : isDuplicate ? '사용할 수 없는 아이디입니다' : ''}</div>
        </FormItem>
      )}
    />
  );
}
