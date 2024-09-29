import React from "react";
import { Select } from "antd";
//@ts-ignore
import { useCountries } from "use-react-countries";
import Image from "next/image";
import { Controller } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";

const CountrySelect = ({
  control,
  name,
  error,
}: {
  control: any;
  name: string;
  error: string;
}) => {
  const { countries } = useCountries();
  return (
    <div className="flex flex-col w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            // direction="rtl"
            className={"w-full !h-[49px] !border-none !shadow-none"}
            showSearch
            allowClear
            value={field.value}
            onChange={(value) => field.onChange(value)}
            placeholder="اختر الدولة"
            optionFilterProp="labelText" // Use labelText for filtering and searching
            filterSort={(optionA, optionB) =>
              (optionA?.labelText ?? "")
                .toLowerCase()
                .localeCompare((optionB?.labelText ?? "").toLowerCase())
            }
            options={countries.map((country: any) => ({
              value: country.countryCallingCode, // Using calling code as the value
              labelText: `${country.name} (${country.countryCallingCode})`, // String for filtering and sorting
              label: (
                <div className="flex items-center">
                  <img
                    src={country.flags.png}
                    alt={country.name}
                    className="mx-2"
                    width={20}
                  />{" "}
                  {country.name}
                </div>
              ),
            }))}
          />
        )}
      />
      <ErrorMsg message={error as string} />
    </div>
  );
};

export default CountrySelect;
