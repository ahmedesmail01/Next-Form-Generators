/* eslint-disable @typescript-eslint/no-unused-vars */
import * as yup from "yup";

export const createYupValidationSchema = (inputs: InputField[]) => {
  const schemaFields = inputs.reduce(
    (acc: { [key: string]: yup.AnySchema }, input: InputField) => {
      let validator;

      // Basic validation based on input type
      switch (input.type) {
        case "email":
          validator = yup
            .string()
            .email("Invalid email")
            .required("This field is required");
          break;
        case "number":
          validator = yup
            .number()
            .typeError("Invalid number")
            .required("This field is required");
          break;
        case "select":
          validator = yup.string().required("This field is required");
          if (input.options && input.options.length > 0) {
            const validValues = input.options.map(
              (option: { label: string; value: string }) => option.value
            );
            validator = validator.oneOf(validValues, "Invalid selection");
          }
          break;
        case "text":
        default:
          validator = yup.string().required("This field is required");
          break;
      }

      // Conditional validation for dependent fields
      if (input.dependant_on) {
        validator = yup.string().when(input.dependant_on, {
          is: (s: string) => {
            return s === input.dependant_value;
          },
          then: (s) => s.required(`${input.label} مطلوب`),
        });
      }

      acc[input.name] = validator;
      return acc;
    },
    {}
  );

  return yup.object().shape(schemaFields);
};
