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
    <div className="w-full flex flex-col gap-1 items-start">
      {/* Separate Label Element */}
      <label
        htmlFor={name}
        className="block w-full text-right text-sm text-gray-500 mb-2"
      >
        {input.label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <RadioGroup
              dir="rtl" // Ensures radio options are in RTL direction
              value={field.value}
              onValueChange={field.onChange}
              orientation="vertical" // Adjust as needed: 'horizontal' or 'vertical'
            >
              {input.options?.map((option: string, index: number) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </RadioGroup>

            {/* Error Message */}
            {errors[name] && (
              <span className="block w-full text-red-500 mt-1 text-right">
                {errors[name]?.message?.toString()}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};
