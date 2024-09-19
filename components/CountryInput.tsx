import { InputField } from "@/interfaces";
import { Controller, FieldValues, Path } from "react-hook-form";
import { RenderInputProps } from "./FormInputs";
import countryList from "react-select-country-list";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import ReactCountryFlag from "react-country-flag";
import { useMemo } from "react";

interface CountryOption {
  label: string;
  value: string;
  code: string;
}

export const CountryInput = <TFormValues extends FieldValues>({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps<TFormValues>) => {
  const name = input.name as Path<TFormValues>;

  // Move useMemo calls to the top level
  const countries = useMemo(() => countryList().getData(), []);

  // Modify countries data to include country code
  const modifiedCountries: CountryOption[] = useMemo(() => {
    return countries.map((country) => ({
      label: country.label,
      value: country.value,
      code: country.value.toUpperCase(), // Country code in uppercase
    }));
  }, [countries]);

  // Custom Option component
  const Option = (props: OptionProps<CountryOption>) => {
    const { data, innerProps, innerRef, isFocused, isSelected } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          backgroundColor: isSelected
            ? "#E4E4E7" // Selected background
            : isFocused
            ? "#E4E4E7" // Hover background
            : undefined,
          color: isSelected || isFocused ? "#006064" : undefined,
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        <ReactCountryFlag
          countryCode={data.code}
          svg
          style={{
            width: "1.5em",
            height: "1.5em",
            borderRadius: "50%",
            marginRight: "8px",
          }}
        />
        <span>{data.label}</span>
      </div>
    );
  };

  // Custom SingleValue component
  const SingleValue = (props: SingleValueProps<CountryOption>) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ReactCountryFlag
            countryCode={data.code}
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          />
          <span>{data.label}</span>
        </div>
      </components.SingleValue>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // Calculate selected country based on field value
        const selectedCountry = modifiedCountries.find(
          (country) => country.label === field.value
        );

        return (
          <div className="w-full">
            <Select<CountryOption, false>
              options={modifiedCountries}
              placeholder={input.label}
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              name={String(name)}
              value={selectedCountry}
              onChange={(newValue) => {
                field.onChange(newValue ? newValue.label : "");
              }}
              isClearable
              menuPosition="absolute"
              menuPlacement="auto"
              components={{ Option, SingleValue }}
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  paddingInline: "10px",
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#F4F4F5",
                  height: "56px",
                  borderRadius: "60px",
                  border: "none",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  textAlign: "right",
                  direction: "rtl",
                }),
                input: (provided) => ({
                  ...provided,
                  textAlign: "right",
                  direction: "rtl",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  textAlign: "right",
                  direction: "rtl",
                }),
                menuList: (provided) => ({
                  ...provided,
                  textAlign: "right",
                  direction: "rtl",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? "#E4E4E7" // Selected background
                    : state.isFocused
                    ? "#E4E4E7" // Hover background
                    : provided.backgroundColor,
                  color:
                    state.isSelected || state.isFocused
                      ? "#E4E4E7" // Text color on hover/selected
                      : provided.color,
                  cursor: "#E4E4E7",
                }),
              }}
            />
            {errors[name] && (
              <span
                dir="rtl"
                className="block w-full text-red-500 mt-1 text-right"
              >
                {errors[name]?.message?.toString()}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
