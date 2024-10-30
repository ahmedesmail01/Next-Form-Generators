import React from "react";
import { Select } from "antd";
//@ts-ignore
import { useCountries } from "use-react-countries";
import { Control, Controller } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";
import Image from "next/image";

const CountrySelect = ({
  control,
  name,
  error,
}: {
  control: Control;
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
            direction="rtl"
            className={"w-full !rounded-full !h-[49px]"}
            showSearch
            variant="outlined"
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
              value: country?.name, // Using calling code as the value
              labelText: `${country.name} (${country.countryCallingCode})`, // String for filtering and sorting
              label: (
                <div className="flex items-center">
                  <Image
                    src={country.flags.png}
                    alt={country.name}
                    className="mx-2"
                    width={20}
                    height={20}
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
