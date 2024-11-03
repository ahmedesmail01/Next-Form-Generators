import { Input, message, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";
import PhoneNumber from "./PhoneNumber";
import CountrySelect from "./CountrySelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { api } from "@/services/api";
import { InputClassNames } from "./FormComponent";
import { createYupValidationSchema } from "@/utils/createYupSchema";
import { Button, Input as NextUIInput } from "@nextui-org/react";
import SelectList from "./SelectList";

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
  const [formSchema, setSchema] = React.useState<any>(null);

  const inputIdToNameMap = React.useMemo(() => {
    return inputs?.reduce((acc, input) => {
      acc[input.dependant_on as any] = input.name;
      return acc;
    }, {} as Record<number, string>);
  }, [inputs]);

  useEffect(() => {
    if (inputs) {
      setSchema(createYupValidationSchema(inputs));
    }
  }, [inputs]);

  if (form.layout === "form_wz_banner") {
    return (
      <div className="w-full min-h-screen h-fit flex">
        <div className="w-full lg:w-1/2 bg-white flex flex-col pb-8 items-center justify-center p-8">
          <Image
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
            className="w-full h-screen sticky top-0 object-top"
          />
        </div>
      </div>
    );
  }

  if (form.layout == "form_only") {
    return (
      <div className="w-[600px]   p-4 my-4 rounded-xl flex flex-col items-center justify-center m-auto max-w-full min-h-fit py-6">
        <Image
          src={form?.logo}
          width={200}
          height={200}
          className="max-w-full  mb-4"
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
  type FormData = yup.InferType<typeof formSchema>;

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
        // // Check if the field is dependant and get its value from watchFields
        if (input.dependant_on && input.dependant_value) {
          // const dependantValue =
          // watchFields[inputIdToNameMap[input.dependant_on]];
          // console.log(watchFields);
          // console.log(input.dependant_on);
          // console.log(inputIdToNameMap);
          // console.log(watchFields[input.dependant_on]);
          if (watchFields[input.dependant_on] !== input.dependant_value)
            return null;
        }

        // Render input based on type
        switch (input.type) {
          case "text":
          case "email":
          case "number":
            return (
              <div key={input.id} className="flex flex-col" dir="rtl">
                <Controller
                  name={input.name}
                  control={control}
                  render={({ field }) => (
                    <NextUIInput
                      isRequired
                      key={input.id}
                      size="sm"
                      value={field.value}
                      onChange={field.onChange}
                      dir="rtl"
                      type={input.type}
                      name={input.name}
                      label={input.label}
                      classNames={{
                        label: "pr-2",
                        input: "pr-2",
                        inputWrapper:
                          "!bg-[#F5F8FC] !hover:bg-[#F5F8FC] border-none rounded-[24px] ",
                      }}
                      variant={"flat"}
                      radius={"full"}
                      className="w-full"
                    />
                  )}
                />
                <ErrorMsg message={errors[input.name]?.message as string} />
              </div>
            );
          case "select":
            return (
              <SelectList input={input} errors={errors} control={control} />
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
          variant="bordered"
          className="!border-primary border !text-primary w-full !p-5 !font-bold !rounded-full"
          type="submit"
          isLoading={isSubmitting}
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
