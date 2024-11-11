import { FormControl, FormField, FormItem, FormLabel } from './form';

import { HTMLInputTypeAttribute } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from './input';

interface RHFInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  errorMsg: string;
  validate?: boolean;
}
export function RHFInput({ name, label, placeholder, type, errorMsg, validate }: RHFInputProps) {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center w-[390px] h-[24px]">
              <FormLabel className="text-white">{label}</FormLabel>
            </div>
            <FormControl>
              <Input placeholder={placeholder} {...field} type={type} />
            </FormControl>
            {validate !== undefined ? (
              <div className="text-[#FECACA]">{validate !== undefined && validate === false ? errorMsg : ''}</div>
            ) : (
              <div className="text-[#FECACA]">{errorMsg}</div>
            )}
          </FormItem>
        )}
      />
    </>
  );
}
