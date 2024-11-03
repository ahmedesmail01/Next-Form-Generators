import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import React from "react";
import { Control, Controller } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";
//@ts-ignore
import { useCountries } from "use-react-countries";
import Image from "next/image";

const SelectList = ({
  input,
  control,
  errors,
}: {
  input: InputField;
  control: Control;
  errors: any;
}) => {
  const { countries } = useCountries();

  const isCountryInput =
    input.name === "country" || input.name === "country_code";
  const options = isCountryInput
    ? countries.map((country: Country) => ({
        label:
          input.name === "country"
            ? country.name
            : `${country.name} (${country.countryCallingCode})`,
        value: country.name,
        avatar: country.flags.svg, // Assume this is the URL to the SVG image
      }))
    : input.options || [];

  if (!options.length) return null;

  return (
    <Controller
      name={input.name}
      control={control}
      render={({ field }) => (
        <div className="choose_country_autocomplete" dir="rtl">
          <Autocomplete
            size="sm"
            radius="full"
            variant="bordered"
            classNames={{
              base: "!bg-[#F5F8FC] !border-none rounded-[24px] !hover:bg-[#F5F8FC]",
            }}
            isRequired
            className="w-full"
            label={input.label}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            onSelectionChange={(value) => field.onChange(value)}
          >
            {options.map((option: InputOption, key: number) => (
              <AutocompleteItem
                key={option.value}
                className="cursor-pointer"
                value={option.value}
                startContent={
                  option.avatar ? (
                    <Image
                      src={option.avatar}
                      width={30}
                      height={30}
                      alt={option.value}
                      className="mx-2 "
                    />
                  ) : null
                }
              >
                {option.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          {errors[input.name] && (
            <ErrorMsg message={errors[input.name]?.message as string} />
          )}
        </div>
      )}
    />
  );
};

export default SelectList;

type Country = {
  name: string;
  countryCallingCode: string;
  flags: {
    svg: string;
  };
};
