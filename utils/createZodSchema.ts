import { z, ZodTypeAny } from "zod";
import { InputField } from "../interfaces";

type ZodShape = { [key: string]: ZodTypeAny };

export const createZodSchema = (inputs: InputField[]) => {
  const shape: ZodShape = {};

  // Create a mapping from input_id to input name
  const inputIdToNameMap: Record<number, string> = {};
  inputs.forEach((input) => {
    inputIdToNameMap[input.input_id] = input.name;
  });

  inputs.forEach((input) => {
    let schema: ZodTypeAny;

    switch (input.type) {
      case "text":
        schema = z.string();
        break;

      case "email":
        schema = z.string().email({ message: "Invalid email address" });
        break;

      case "phone":
        schema = z.string().min(5, { message: "Enter complete phone" });
        break;

      case "select":
        schema = z.string();
        break;

      case "checkbox":
        schema = z.boolean();
        break;

      case "radio":
        schema = z.string();
        break;

      case "country":
        schema = z.string();
        break;

      default:
        schema = z.any();
    }

    // Initially set all fields as optional
    schema = schema.optional();

    shape[input.name] = schema;
  });

  // Create the base schema object
  let mainSchema = z.object(shape);

  // Add conditional validation for required fields and dependencies
  //@ts-ignore
  mainSchema = mainSchema.superRefine((data, ctx) => {
    inputs.forEach((input) => {
      const value = data[input.name];

      // Handle conditional required validation
      let isRequired = input.required;

      // Check if the field has dependencies
      if (input.is_dependent && input.dependent_on !== undefined) {
        const dependentFieldName = inputIdToNameMap[input.dependent_on];
        if (dependentFieldName) {
          const dependentValue = data[dependentFieldName];

          // If the dependency condition is not met, the field is not required
          if (dependentValue !== input.dependent_value) {
            isRequired = false;
          }
        } else {
          // If dependent field name is not found, skip validation
          console.warn(
            `Dependent field with input_id ${input.dependent_on} not found for input ${input.name}.`
          );
          isRequired = false;
        }
      }

      // Validate required fields
      if (isRequired) {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "") ||
          (typeof value === "boolean" && value === false)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [input.name],
            message: `${input.label} is required`,
          });
        }
      }
    });
  });

  return mainSchema;
};
