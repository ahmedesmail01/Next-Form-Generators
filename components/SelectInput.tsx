import { InputField } from "@/interfaces";
import { Controller, FieldValues, Path } from "react-hook-form";
import { RenderInputProps } from "./FormInputs";
import { Select, SelectItem } from "@nextui-org/react";

export const SelectInput = <TFormValues extends FieldValues>({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps<TFormValues>) => {
  const name = input.name as Path<TFormValues>;
  const options = input.options ?? [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Select
            radius="full"
            className="select_holder"
            classNames={{
              listbox: "select_holderrrr",
            }}
            label={input.label}
            selectedKeys={field.value ? new Set([field.value]) : new Set()}
            onSelectionChange={(keys) => {
              const value = Array.from(keys).pop() as string;
              field.onChange(value);
            }}
            isInvalid={!!errors[name]}
            validationState={errors[name] ? "invalid" : "valid"}
            errorMessage={errors[name]?.message?.toString()}
          >
            {options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
          {errors[name] && (
            <span
              dir="rtl"
              className="block w-full text-red-500 mt-1 text-right"
            >
              {errors[name]?.message?.toString()}
            </span>
          )}
        </>
      )}
    />
  );
};
