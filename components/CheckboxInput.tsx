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
        render={({ field }) => {
          if (hasOptions) {
            // CheckboxGroup for multiple options
            return (
              <>
                <CheckboxGroup
                  dir="rtl" // Ensures checkbox options are in RTL direction
                  value={field.value || []} // Ensure value is an array
                  onChange={(values) => field.onChange(values)}
                  orientation="vertical" // Adjust as needed: 'horizontal' or 'vertical'
                  className="w-full" // Make the CheckboxGroup take full width
                >
                  {input.options!.map((option, index) => (
                    <Checkbox key={index} value={option}>
                      {option}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                {errors[name] && (
                  <span className="block w-full text-red-500 mt-1 text-right">
                    {errors[name]?.message?.toString()}
                  </span>
                )}
              </>
            );
          } else {
            // Single Checkbox
            return (
              <>
                <div className="flex items-center">
                  <Checkbox
                    {...field}
                    isSelected={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="mr-2" // Add some space between checkbox and label
                  >
                    {input.label}
                  </Checkbox>
                </div>
                {errors[name] && (
                  <span className="block w-full text-red-500 mt-1 text-right">
                    {errors[name]?.message?.toString()}
                  </span>
                )}
              </>
            );
          }
        }}
      />
    </div>
  );
};
