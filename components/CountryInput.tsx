import { InputField } from "@/interfaces";
import { Controller, FieldValues, Path } from "react-hook-form";
import { RenderInputProps } from "./FormInputs";
import countryList from "react-select-country-list";
import Select, { SingleValue } from "react-select";

export const CountryInput = <TFormValues extends FieldValues>({
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
          <div>
            <label>{input.label}</label>
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
          </div>
        );
      }}
    />
  );
};
