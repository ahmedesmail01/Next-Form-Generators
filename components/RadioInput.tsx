import { InputField } from "@/interfaces";
import { Controller, FieldValues, Path } from "react-hook-form";
import { RenderInputProps } from "./FormInputs";
import { Radio, RadioGroup } from "@nextui-org/react";

export const RadioInput = <TFormValues extends FieldValues>({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps<TFormValues>) => {
  const name = input.name as Path<TFormValues>;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <RadioGroup
            label={input.label}
            value={field.value}
            onValueChange={field.onChange}
          >
            {input.options?.map((option: string, index: number) => (
              <Radio key={index} value={option}>
                {option}
              </Radio>
            ))}
          </RadioGroup>
          {errors[name] && (
            <span style={{ color: "red" }}>
              {errors[name]?.message?.toString()}
            </span>
          )}
        </>
      )}
    />
  );
};
