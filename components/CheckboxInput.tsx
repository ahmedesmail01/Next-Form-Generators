import { InputField } from "@/interfaces";
import { Controller, FieldValues, Path } from "react-hook-form";
import { RenderInputProps } from "./FormInputs";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

export const CheckboxInput = <TFormValues extends FieldValues>({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps<TFormValues>) => {
  const name = input.name as Path<TFormValues>;
  const hasOptions = input.options && input.options.length > 0;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (hasOptions) {
          // CheckboxGroup for multiple options
          return (
            <>
              <CheckboxGroup
                {...field}
                label={input.label}
                value={field.value || []} // Ensure value is an array
                onChange={(values) => field.onChange(values)}
              >
                {input.options!.map((option, index) => (
                  <Checkbox key={index} value={option}>
                    {option}
                  </Checkbox>
                ))}
              </CheckboxGroup>
              {errors[name] && (
                <span style={{ color: "red" }}>
                  {errors[name]?.message?.toString()}
                </span>
              )}
            </>
          );
        } else {
          // Single Checkbox
          return (
            <>
              <Checkbox
                {...field}
                isSelected={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                {input.label}
              </Checkbox>
              {errors[name] && (
                <span style={{ color: "red" }}>
                  {errors[name]?.message?.toString()}
                </span>
              )}
            </>
          );
        }
      }}
    />
  );
};
