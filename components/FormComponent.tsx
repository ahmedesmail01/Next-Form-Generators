"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, Radio, Select, Spin, Steps, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import ErrorMsg from "./ErrorMsg";
import PhoneNumber from "./PhoneNumber";
import CountrySelect from "./CountrySelect";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spinner } from "@nextui-org/react";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
// const InputClassNames = `!border-[#E7E9EB] !p-0 h-[49px] !px-4 placeholder:!text-[#696969]  placeholder:!text-sm placeholder:!font-normal placeholder:!leading-[normal]`;
export const InputClassNames = `!border-[#d9d9d9] !p-0 h-[49px] !px-4 placeholder:!text-[#696969]  placeholder:!text-sm placeholder:!font-normal placeholder:!leading-[normal]`;

// Define the types for the input fields
interface InputOption {
  label: string;
  value: string;
  _id?: string;
}

export interface FormInput {
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
  attendance_type: "offline" | "offline-online" | "webinar" | "online";
}
const FormComponent = ({ form }: { form: FormModel }) => {
  console.log(form, "form");

  const [current, setCurrent] = useState(0);
  const [client, setClient] = useState<typeof form.inputs>([]);

  const { token } = theme.useToken();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    minHeight: `80vh`,
    height: "fit-content",
    // padding: "50px",
  };

  const steps = [
    {
      title: "Register your data",
      content: (
        <FormStep1
          form={form}
          next={next}
          prev={prev}
          stepsLength={2}
          current={current}
          isStepperRendered={true}
          client={client}
          setClient={setClient}
        />
      ),
    },
    {
      title: "Reserve a seat",
      content: (
        <FormStep2
          form={form}
          next={next}
          prev={prev}
          stepsLength={2}
          current={current}
          isStepperRendered={true}
          client={client}
          setClient={setClient}
        />
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      form?.color_scheme?.primary
    );

    document.title = form.title || "";
    const link: any =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = form.logo;

    document.getElementsByTagName("head")[0].appendChild(link);
    // document.documentElement.title = "Form";
  }, [form]);

  // form./
  if (
    form.attendance_type == "offline" ||
    form.attendance_type == "offline-online"
  ) {
    return (
      <div className="flex flex-col w-full p-[30px]">
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <FormStep1
        client={client}
        setClient={setClient}
        form={form}
        isStepperRendered={false}
      />
    </div>
  );
};

export default FormComponent;
