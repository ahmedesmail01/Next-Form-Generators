/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, message, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";
import PhoneNumber from "./PhoneNumber";
import CountrySelect from "./CountrySelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Image from "next/image";
import { api } from "@/services/api";
import { InputClassNames } from "./FormComponent";

const FormStep1 = ({
  form,
  inputs,
  next,
  prev,
  current,
  isStepperRendered,
  client,
  setClient,
}: {
  form: FormDetails;
  inputs: InputField[];
  next?: () => void;
  prev?: () => void;
  current?: any;
  stepsLength?: number;
  isStepperRendered?: boolean;
  client: any;
  setClient: any;
}) => {
  console.log(inputs);
  const generateValidationSchema = (
    inputs: InputField[]
  ): Yup.ObjectSchema<Record<string, any>> => {
    const shape: Record<string, Yup.AnySchema> = {};

    // Create a lookup object to map `input_id` to `name`
    const inputIdToNameMap = inputs?.reduce((acc, input) => {
      acc[input.id] = input.name;
      return acc;
    }, {} as Record<number, string>);

    console.log(inputIdToNameMap);
    console.log(inputs);

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
        const dependantFieldName = inputIdToNameMap[input.id as any];
        console.log(dependantFieldName);
        console.log(inputIdToNameMap);
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
    return inputs?.reduce((acc, input) => {
      acc[input.input_id] = input.name;
      return acc;
    }, {} as Record<number, string>);
  }, [inputs]);

  useEffect(() => {
    if (inputs) {
      setSchema(generateValidationSchema(inputs));
    }
  }, [inputs]);

  if (form.layout === "form_wz_banner") {
    return (
      <div className="w-full min-h-screen h-fit flex">
        <div className="w-full lg:w-1/2 bg-white flex flex-col pb-8 items-center justify-center p-8">
          <img
            // crossOrigin="anonymous"
            src={form?.logo}
            width={200}
            height={230}
            className="!h-[105px] w-[200px] top-0 object-contain mb-4"
            alt=""
          />
          <h2 className="my-4 font-semibold text-xl">{form?.title}</h2>
          <Form
            inputs={inputs}
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
            src={form?.banner as string}
            alt="Banner"
            className="object-cover w-full h-screen sticky top-0 object-top"
          />
        </div>
      </div>
    );
  }

  if (form.layout == "form_only") {
    console.log(inputs);
    return (
      <div className="w-[600px]   p-4 my-4 rounded-xl flex flex-col items-center justify-center m-auto max-w-full min-h-fit py-6">
        <Image
          // crossOrigin="anonymous"
          src={form?.logo}
          width={200}
          height={200}
          className="max-w-full  mb-4"
          alt=""
        />
        {/* <img src={form?.logo} /> */}
        <h2 className="my-4 font-semibold text-xl">{form?.title}</h2>
        <Form
          inputs={inputs}
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
  inputs,
  next,
  current,
  prev,
  inputIdToNameMap,
  setClient,
  client,
}: {
  isStepperRendered?: boolean;
  formSchema: any;
  form: FormDetails;
  inputs: InputField[];
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
    reset,
    formState: { errors, isSubmitting },
    watch,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: client || {},
  });
  const watchFields = watch();

  const onSubmit = async (data: FormData) => {
    setClient(data);
    if (isStepperRendered) {
      next && next();
    } else {
      const answers = [];
      for (const key in data) {
        const obj = { question: key.toString(), answer: data[key].toString() };
        answers.push(obj);
      }
      const sendData = {
        form_slug: form.form_slug,
        answers,
      };

      try {
        const { status } = await api.post("/form_responses", sendData);
        if (status == 201) {
          message.success("تم ارسال البيانات بنجاح");
          reset();
        }
      } catch (e: any) {
        message.error(e?.response?.data?.message || "حدث خطأ ما");
      }
    }
  };
  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {inputs?.map((input: InputField) => {
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
              <div key={input.id} className="flex flex-col">
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
                  key={input.id}
                  control={control}
                  error={errors[input.name]?.message as string}
                  name={input.name}
                />
              );
            }
            if (input.name == "country") {
              return (
                <CountrySelect
                  key={input.id}
                  control={control}
                  error={errors[input.name]?.message as string}
                  name={input.name}
                />
              );
            }
            return (
              <div key={input.id} className="flex flex-col">
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
              <div key={input.id} className="flex flex-col">
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
                        {input.options?.map((el, i) => (
                          <Radio key={i} value={el.value}>
                            {el.label}
                          </Radio>
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
              <div key={input.id} className="flex flex-col">
                <Controller
                  name={input.name}
                  control={control}
                  render={() => (
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
          loading={isSubmitting}
        >
          {isStepperRendered
            ? "التالي"
            : isSubmitting
            ? "جاري الارسال"
            : "ارسال"}
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
