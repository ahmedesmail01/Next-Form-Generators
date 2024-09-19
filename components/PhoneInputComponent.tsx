import { InputField } from "@/interfaces";
import { Controller, FieldValues, Path } from "react-hook-form";
import { RenderInputProps } from "./FormInputs";
import PhoneInput from "react-phone-input-2";

export const PhoneInputComponent = <TFormValues extends FieldValues>({
  input,
  control,
  errors,
}: { input: InputField } & RenderInputProps<TFormValues>) => {
  const name = input.name as Path<TFormValues>;

  return (
    <div dir="ltr" className="flex  flex-col gap-1 items-start">
      <label
        dir="ltr"
        className="  relative z-10 top-10 text-sm text-gray-500 pe-4 ms-auto"
      >
        {input.label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <PhoneInput
              {...field}
              country={"eg"}
              enableSearch={true}
              buttonStyle={{
                borderRadius: "100%",
                border: "none",
              }}
              inputStyle={{
                width: "100%",
                backgroundColor: "#F4F4F5",
                height: "56px",
                border: "none",
                borderRadius: "80px",
              }}
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
