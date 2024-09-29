"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, Radio, Select, Spin } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMsg";
import PhoneNumber from "./PhoneNumber";
import CountrySelect from "./CountrySelect";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spinner } from "@nextui-org/react";
// const InputClassNames = `!border-[#E7E9EB] !p-0 h-[49px] !px-4 placeholder:!text-[#696969]  placeholder:!text-sm placeholder:!font-normal placeholder:!leading-[normal]`;
const InputClassNames = `!border-[#d9d9d9] !p-0 h-[49px] !px-4 placeholder:!text-[#696969]  placeholder:!text-sm placeholder:!font-normal placeholder:!leading-[normal]`;

// Define the types for the input fields
interface InputOption {
  label: string;
  value: string;
  _id?: string;
}

interface FormInput {
  _id: string;
  type: "text" | "email" | "number" | "select" | "radio" | "checkbox";
  label: string;
  required: boolean;
  input_id: number;
  name: string;
  options?: InputOption[];
  // is_dependant?: boolean;
  dependant_on?: string;
  dependant_value?: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface FormModel {
  _id: string;
  type: string;
  layout: string;
  banner: string;
  logo: string;
  title: string;
  color_scheme: {
    primary: string;
    secondary: string;
    tertiary: string;
    _id: string;
  };
  max_seat: number | null;
  form_slug: string;
  inputs: FormInput[];
  user: {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  __v: number;
}
const FormComponent = ({ form }: { form: FormModel }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      form?.color_scheme?.primary
    );
  }, [form]);

  const [formSchema, setSchema] = React.useState<any>(null);
  // Function to generate Yup validation schema

  const generateValidationSchema = (
    inputs: FormInput[]
  ): Yup.ObjectSchema<Record<string, any>> => {
    const shape: Record<string, Yup.AnySchema> = {};

    // Create a lookup object to map `input_id` to `name`
    const inputIdToNameMap = inputs.reduce((acc, input) => {
      acc[input.input_id] = input.name;
      return acc;
    }, {} as Record<number, string>);

    inputs?.forEach((input) => {
      let validationRule: Yup.AnySchema = Yup.string();

      // Check the input type and create the corresponding validation rule
      switch (input.type) {
        case "text":
          validationRule = Yup.string();
          break;
        case "email":
          validationRule = Yup.string().email("Invalid email format");
          break;
        case "number":
          validationRule = Yup.number().typeError(
            `${input.label} must be a number`
          );
          break;
        case "select":
          validationRule = Yup.string();
          break;
        default:
          validationRule = Yup.string();
      }

      if (input.dependant_on && input.dependant_value) {
        const dependantFieldName = inputIdToNameMap[input.dependant_on as any];

        if (dependantFieldName) {
          // console.log(input.dependant_value);
          shape[input.name] = validationRule.when(dependantFieldName, {
            is: (value: any) => {
              return value === input.dependant_value;
            },
            then: (schema) =>
              input.required
                ? schema.required(`${input.label}`)
                : schema.notRequired(),
            otherwise: (schema) => schema.notRequired(),
          });
        } else {
          shape[input.name] = validationRule;
        }
      } else {
        shape[input.name] = input.required
          ? validationRule.required(`${input.label} is required`)
          : validationRule.notRequired();
      }
    });

    return Yup.object().shape(shape);
  };

  useEffect(() => {
    if (form) {
      setSchema(generateValidationSchema(form.inputs));
    }
  }, [form]);

  type FormData = Yup.InferType<typeof formSchema>;

  const {
    control,
    formState: { errors },
    register,
    watch,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const test: FormData = {};

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const inputIdToNameMap = React.useMemo(() => {
    return form.inputs.reduce((acc, input) => {
      acc[input.input_id] = input.name;
      return acc;
    }, {} as Record<number, string>);
  }, [form.inputs]);

  const watchFields = watch();
  console.log(form?.inputs);
  return (
    <div className="flex flex-col w-full">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {form?.inputs.map((input: FormInput, index: number) => {
          // Check if the field is dependant and get its value from watchFields
          if (input.dependant_on && input.dependant_value) {
            const dependantFieldName =
              inputIdToNameMap[input.dependant_on as any];

            if (dependantFieldName) {
              const dependantValue = watchFields[dependantFieldName];

              // If the dependant value doesn't match, skip rendering this input
              if (dependantValue !== input.dependant_value) {
                return null;
              }
            }
          }

          // Render input based on type
          switch (input.type) {
            case "text":
            case "email":
            case "number":
              return (
                <div key={input._id} className="flex flex-col">
                  <Controller
                    name={input.name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder={input.label}
                        className={InputClassNames}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <ErrorMsg message={errors[input.name]?.message as string} />
                </div>
              );
            case "select":
              if (input.name == "country_code") {
                return (
                  <PhoneNumber
                    key={input._id}
                    control={control}
                    error={errors[input.name]?.message as string}
                    name={input.name}
                  />
                );
              }
              if (input.name == "country") {
                return (
                  <CountrySelect
                    key={input._id}
                    control={control}
                    error={errors[input.name]?.message as string}
                    name={input.name}
                  />
                );
              }
              return (
                <div key={input._id} className="flex flex-col">
                  <Controller
                    name={input.name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        onChange={(e) => onChange(e)}
                        value={value}
                        allowClear
                        placeholder={input.label}
                        className={"w-full !h-[49px] !border-none !shadow-none"}
                        options={input?.options?.map((el) => {
                          return {
                            label: el?.label,
                            value: el?.value,
                          };
                        })}
                      />
                    )}
                  />
                  <ErrorMsg message={errors[input.name]?.message as string} />
                </div>
              );
            case "radio":
              return (
                <div key={input._id} className="flex flex-col">
                  <Controller
                    name={input.name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <h4 className="text-[#696969] text-sm font-normal leading-[normal]">
                          {input.label}
                        </h4>
                        <Radio.Group
                          onChange={(e) => onChange(e.target.value)}
                          value={value}
                        >
                          {input.options?.map((el) => (
                            <Radio value={el.value}>{el.label}</Radio>
                          ))}
                        </Radio.Group>
                      </>
                    )}
                  />
                  <ErrorMsg message={errors[input.name]?.message as string} />
                </div>
              );
            default:
              return (
                <div key={input._id} className="flex flex-col">
                  <Controller
                    name={input.name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <h4 className="text-[#696969] text-sm font-normal leading-[normal]">
                          {input.label}
                        </h4>
                        <Radio.Group>
                          <Radio value="apple"> Apple </Radio>
                          <Radio value="pear"> Pear </Radio>
                        </Radio.Group>
                      </>
                    )}
                  />
                  <ErrorMsg message={errors[input.name]?.message as string} />
                </div>
              );
          }
        })}
        <Button type="primary" className="!bg-primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormComponent;
