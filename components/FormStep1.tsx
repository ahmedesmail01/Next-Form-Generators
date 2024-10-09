import { Button, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";
import PhoneNumber from "./PhoneNumber";
import CountrySelect from "./CountrySelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormInput, FormModel, InputClassNames } from "./FormComponent";
import Image from "next/image";

const FormStep1 = ({
  form,
  next,
  prev,
  current,
  stepsLength,
  isStepperRendered,
  client,
  setClient,
}: {
  form: FormModel;
  next?: () => void;
  prev?: () => void;
  current?: any;
  stepsLength?: number;
  isStepperRendered?: boolean;
  client: any;
  setClient: any;
}) => {
  const generateValidationSchema = (
    inputs: FormInput[]
  ): Yup.ObjectSchema<Record<string, any>> => {
    const shape: Record<string, Yup.AnySchema> = {};

    // Create a lookup object to map `input_id` to `name`
    const inputIdToNameMap = inputs?.reduce((acc, input) => {
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
          validationRule = Yup.string().email("بريد الكتروني غير صالح");
          break;
        case "number":
          validationRule = Yup.number().typeError(
            `${input.label} يجب ان يكون رقم`
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
          ? validationRule.required(`${input.label} مطلوب`)
          : validationRule.notRequired();
      }
    });

    return Yup.object().shape(shape);
  };
  const [formSchema, setSchema] = React.useState<any>(null);

  const inputIdToNameMap = React.useMemo(() => {
    return form?.inputs?.reduce((acc, input) => {
      acc[input.input_id] = input.name;
      return acc;
    }, {} as Record<number, string>);
  }, [form.inputs]);

  useEffect(() => {
    if (form) {
      setSchema(generateValidationSchema(form.inputs));
    }
  }, [form]);

  if (form.layout === "form_wz_banner") {
    return (
      <div className="w-full min-h-screen h-fit flex">
        <div className="w-full lg:w-1/2 bg-white flex flex-col pb-8 items-center justify-center p-8">
          <Image
            crossOrigin="anonymous"
            src={form?.logo}
            width={200}
            height={230}
            className="!h-[105px] w-[200px] top-0 object-contain mb-4"
            alt=""
          />
          <h2 className="my-4 font-semibold text-xl">{form?.title}</h2>
          <Form
            form={form}
            formSchema={formSchema}
            current={current}
            isStepperRendered={isStepperRendered}
            next={next}
            prev={prev}
            inputIdToNameMap={inputIdToNameMap}
            client={client}
            setClient={setClient}
          />
        </div>

        <div className="hidden lg:block lg:w-1/2">
          <Image
            crossOrigin="anonymous"
            width={100}
            height={100}
            src={form?.banner}
            alt="Banner"
            className="object-cover w-full h-screen sticky top-0 object-top"
          />
        </div>
      </div>
    );
  }

  if (form.layout == "form_only") {
    return (
      <div className="w-[600px]   p-4 my-4 rounded-xl flex flex-col items-center justify-center m-auto max-w-full min-h-fit py-6">
        <Image
          crossOrigin="anonymous"
          src={form?.logo}
          width={200}
          height={200}
          className="!h-[105px] w-[400px] max-w-full top-0 object-contain mb-4"
          alt=""
        />
        <h2 className="my-4 font-semibold text-xl">{form?.title}</h2>
        <Form
          form={form}
          formSchema={formSchema}
          current={current}
          isStepperRendered={isStepperRendered}
          next={next}
          prev={prev}
          inputIdToNameMap={inputIdToNameMap}
          client={client}
          setClient={setClient}
        />
      </div>
    );
  }
};

export default FormStep1;

const Form = ({
  isStepperRendered,
  formSchema,
  form,
  next,
  current,
  prev,
  inputIdToNameMap,
  setClient,
  client,
}: {
  isStepperRendered?: boolean;
  formSchema: any;
  form: FormModel;
  next?: () => void;
  current?: any;
  prev?: () => void;
  inputIdToNameMap: Record<number, string>;
  setClient: any;
  client: any;
}) => {
  type FormData = Yup.InferType<typeof formSchema>;

  const {
    control,
    formState: { errors },
    register,
    watch,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: client || {},
  });
  const watchFields = watch();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setClient(data);
    if (isStepperRendered) {
      next && next();
    }
  };
  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
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
                  render={({ field }) => (
                    <Input
                      dir="rtl"
                      style={
                        {
                          // borderRadius: "20px",
                          // background: "#fbfbfb",
                        }
                      }
                      placeholder={input.label}
                      className={InputClassNames}
                      {...field}
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
      <div className="w-full">
        <Button
          type="primary"
          className="!bg-primary w-full !p-5 !font-bold"
          htmlType="submit"
        >
          {isStepperRendered ? "التالي" : "ارسال"}
        </Button>

        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev && prev()}>
            Previous
          </Button>
        )}
      </div>
    </form>
  );
};
