// File: components/FormInputs.tsx

import {
  Controller,
  Control,
  UseFormRegister,
  FieldErrors,
  FieldValues, // Import FieldValues
  Path,
} from "react-hook-form";
import Select, { SingleValue } from "react-select";

import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Select as SelectUi,
  SelectItem,
} from "@nextui-org/react";
import { InputField } from "../interfaces";

interface RenderInputProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
}

const TextInput = <TFormValues extends FieldValues>({
  input,
  register,
  errors,
}: { input: InputField } & RenderInputProps<TFormValues>) => {
  const name = input.name as Path<TFormValues>;

  return (
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
  );
};

const PhoneInputComponent = <TFormValues extends FieldValues>({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps<TFormValues>) => {
  const name = input.name as Path<TFormValues>;

  return (
    <div dir="ltr">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <PhoneInput
              {...field}
              country={"eg"}
              enableSearch={true}
              inputStyle={{ width: "100%" }}
              containerStyle={{ marginBottom: "10px" }}
              onChange={(phone) => field.onChange(phone)}
              value={typeof field.value === "string" ? field.value : ""}
            />
            {errors[name] && (
              <span style={{ color: "red" }}>
                {errors[name]?.message?.toString()}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

const SelectInput = <TFormValues extends FieldValues>({
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
          <SelectUi
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
          </SelectUi>
        </>
      )}
    />
  );
};

const CheckboxInput = <TFormValues extends FieldValues>({
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
          <Checkbox
            {...field}
            isSelected={field.value}
            onValueChange={field.onChange}
          >
            {input.label}
          </Checkbox>
          <br />
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

const RadioInput = <TFormValues extends FieldValues>({
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

const CountryInput = <TFormValues extends FieldValues>({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps<TFormValues>) => {
  const name = input.name as Path<TFormValues>;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const countries = countryList().getData();
        const selectedCountry = countries.find(
          (country) => country.label === field.value
        );

        return (
          <>
            <Select
              options={countries}
              name={String(name)}
              value={selectedCountry}
              onChange={(
                newValue: SingleValue<{ label: string; value: string }>
              ) => {
                field.onChange(newValue ? newValue.label : "");
              }}
              isClearable
              menuPosition="absolute"
              menuPlacement="auto"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                }),
              }}
            />
            {errors[name] && (
              <span style={{ color: "red" }}>
                {errors[name]?.message?.toString()}
              </span>
            )}
          </>
        );
      }}
    />
  );
};

export function renderInput<TFormValues extends FieldValues>(
  input: InputField,
  props: RenderInputProps<TFormValues>
) {
  switch (input.type) {
    case "text":
    case "email":
      return (
        <TextInput<TFormValues> key={input._id} input={input} {...props} />
      );
    case "phone":
      return (
        <PhoneInputComponent<TFormValues>
          key={input._id}
          input={input}
          {...props}
        />
      );
    case "select":
      return (
        <SelectInput<TFormValues> key={input._id} input={input} {...props} />
      );
    case "checkbox":
      return (
        <CheckboxInput<TFormValues> key={input._id} input={input} {...props} />
      );
    case "radio":
      return (
        <RadioInput<TFormValues> key={input._id} input={input} {...props} />
      );
    case "country":
      return (
        <CountryInput<TFormValues> key={input._id} input={input} {...props} />
      );
    default:
      return null;
  }
}
