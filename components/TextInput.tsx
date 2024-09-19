import { InputField } from "@/interfaces";
import { Input } from "@nextui-org/react";
import { FieldValues, Path } from "react-hook-form";
import { RenderInputProps } from "./FormInputs";

export const TextInput = <TFormValues extends FieldValues>({
  input,
  register,
  errors,
}: { input: InputField } & RenderInputProps<TFormValues>) => {
  const name = input.name as Path<TFormValues>;

  return (
    <>
      <Input
        dir="rtl"
        radius="full"
        type={input.type}
        label={input.label}
        isRequired={input.required}
        isInvalid={!!errors[name]}
        errorMessage={errors[name]?.message?.toString()}
        {...register(name)}
      />
    </>
  );
};
