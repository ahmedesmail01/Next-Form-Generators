import FormComponent, { FormModel } from "@/components/FormComponent";
import { CustomError, getOne } from "@/services/server";
import Image from "next/image";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = params;
  const formDetails: FormModel = await getOne<FormModel>(`forms`, slug);
  // console.log(formDetails);
  return <FormComponent form={formDetails as FormModel} />;
};

export default page;
