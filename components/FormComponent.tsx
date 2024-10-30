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
export const InputClassNames = `!hover:border-primary !rounded-full !border-[#d9d9d9] !p-0 h-[49px] !px-4 placeholder:!text-[#696969]  placeholder:!text-sm placeholder:!font-normal placeholder:!leading-[normal]`;

const FormComponent = ({ data }: { data: GetFormResponse }) => {
  const [current, setCurrent] = useState(0);
  const [client, setClient] = useState<(typeof data.inputs)[0]>();
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
  };

  const steps = [
    {
      title: "تسجيل البيانات",
      content: (
        <FormStep1
          inputs={data.inputs}
          form={data.form}
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
      title: "حجز مقعد",
      content: (
        <FormStep2
          inputs={data.inputs}
          form={data.form}
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
      data.form?.primary_color
    );

    document.title = data.form.title || "";
    const link: any =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = data.form.logo;

    document.getElementsByTagName("head")[0].appendChild(link);
    // document.documentElement.title = "Form";
  }, [data.form]);

  // form./
  if (
    data.form.attendance_type == "offline" ||
    data.form.attendance_type == "offline-online"
  ) {
    return (
      <div className="flex flex-col w-full p-[30px]">
        <Steps
          direction="horizontal"
          //@ts-ignore
          dir="rtl"
          type="default"
          current={current}
          items={items}
        />
        <div style={contentStyle}>{steps[current].content}</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <FormStep1
        inputs={data.inputs}
        client={client}
        setClient={setClient}
        form={data.form}
        isStepperRendered={false}
      />
    </div>
  );
};

export default FormComponent;
