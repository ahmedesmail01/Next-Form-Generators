import FormComponent from "@/components/FormComponent";
import { getOne } from "@/services/server";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = params;
  const formDetails: GetFormResponse = await getOne<GetFormResponse>(
    `forms`,
    slug
  );
  return <FormComponent data={formDetails} />;
};

export default page;
