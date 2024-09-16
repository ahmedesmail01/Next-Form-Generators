// File: components/FormInputs.tsx

import {
  Controller,
  Control,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import Select, { SingleValue } from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input, Checkbox, Radio, RadioGroup } from "@nextui-org/react";
import { InputField } from "../interfaces";

interface RenderInputProps {
  control: Control;
  register: UseFormRegister<InputField>;
  errors: FieldErrors;
}

const TextInput = ({
  input,
  register,
  errors,
}: { input: InputField } & RenderInputProps) => {
  if (input.dependent_on) {
    return (
      <Input
        dir="rtl"
        radius="full"
        type={input.type}
        label={input.label}
        isRequired={input.required}
        isInvalid={!!errors[input.name as keyof InputField]} // Explicitly cast to keyof InputField
        errorMessage={errors[
          input.name as keyof InputField
        ]?.message?.toString()} // Explicitly cast to keyof InputField
        {...register(input.name as keyof InputField)}
      />
    );
  }
};

const PhoneInputComponent = ({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps) => (
  <div dir="ltr">
    <Controller
      name={input.name}
      control={control}
      render={({ field }) => (
        <>
          <PhoneInput
            {...field}
            country={"eg"}
            enableSearch={true}
            inputStyle={{ width: "100%" }}
            containerStyle={{
              marginBottom: "10px",
            }}
            onChange={(phone) => field.onChange(phone)}
            value={typeof field.value === "string" ? field.value : ""}
          />
          {errors[input.name] && (
            <span style={{ color: "red" }}>
              {errors[input.name]?.message?.toString()}
            </span>
          )}
        </>
      )}
    />
  </div>
);

const SelectInput = ({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps) => (
  <Controller
    name={input.name}
    control={control}
    render={({ field }) => (
      <>
        <Select
          options={input.options?.map((option: string) => ({
            value: option,
            label: option,
          }))}
          placeholder={input.label}
          className={errors[input.name] ? "is-invalid" : ""}
          value={
            field.value ? { value: field.value, label: field.value } : null
          }
          onChange={(
            newValue: SingleValue<{ value: string; label: string }>
          ) => {
            field.onChange(newValue ? newValue.value : "");
          }}
        />
        {errors[input.name] && (
          <span style={{ color: "red" }}>
            {errors[input.name]?.message?.toString()}
          </span>
        )}
      </>
    )}
  />
);

const CheckboxInput = ({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps) => (
  <Controller
    name={input.name}
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
        {errors[input.name] && (
          <span style={{ color: "red" }}>
            {errors[input.name]?.message?.toString()}
          </span>
        )}
      </>
    )}
  />
);

const RadioInput = ({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps) => (
  <Controller
    name={input.name}
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
        {errors[input.name] && (
          <span style={{ color: "red" }}>
            {errors[input.name]?.message?.toString()}
          </span>
        )}
      </>
    )}
  />
);

const CountryInput = ({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps) => (
  <Controller
    name={input.name}
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
            name={input.name}
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
          {errors[input.name] && (
            <span style={{ color: "red" }}>
              {errors[input.name]?.message?.toString()}
            </span>
          )}
        </>
      );
    }}
  />
);

export const renderInput = (input: InputField, props: RenderInputProps) => {
  switch (input.type) {
    case "text":
    case "email":
      return <TextInput key={input._id} input={input} {...props} />;
    case "phone":
      return <PhoneInputComponent key={input._id} input={input} {...props} />;
    case "select":
      return <SelectInput key={input._id} input={input} {...props} />;
    case "checkbox":
      return <CheckboxInput key={input._id} input={input} {...props} />;
    case "radio":
      return <RadioInput key={input._id} input={input} {...props} />;
    case "country":
      return <CountryInput key={input._id} input={input} {...props} />;
    default:
      return null;
  }
};
