// File: components/FormInputs.tsx

import {
  Control,
  UseFormRegister,
  FieldErrors,
  FieldValues, // Import FieldValues
} from "react-hook-form";

import "react-phone-input-2/lib/style.css";
import { InputField } from "../interfaces";
import { TextInput } from "./TextInput";
import { PhoneInputComponent } from "./PhoneInputComponent";
import { SelectInput } from "./SelectInput";
import { CheckboxInput } from "./CheckboxInput";
import { RadioInput } from "./RadioInput";
import { CountryInput } from "./CountryInput";

export interface RenderInputProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
}

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
