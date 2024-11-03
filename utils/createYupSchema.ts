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
            .email("بريد إلكتروني غير صالح")
            .required("هذا الحقل مطلوب");
          break;
        case "number":
          validator = yup
            .number()
            .typeError("رقم غير صالح")
            .required("هذا الحقل مطلوب");
          break;
        case "select":
          validator = yup.string().required("هذا الحقل مطلوب");
          if (input.options && input.options.length > 0) {
            const validValues = input.options.map(
              (option: { label: string; value: string }) => option.value
            );
            validator = validator.oneOf(validValues, "اختيار غير صالح");
          }
          break;
        case "text":
        default:
          validator = yup.string().required("هذا الحقل مطلوب");
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
