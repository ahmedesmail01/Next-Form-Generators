"use client";
import FormComponent from "@/components/FormComponent";
import Loading from "@/components/Loading";
import { getAll, getOne } from "@/services/server";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import useSWR from "swr";

const Page = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = params;
  const { data, isLoading } = useSWR(`forms/${slug}`, getAll);
  const form: GetFormResponse | any = data || [];

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin size="small" indicator={<LoadingOutlined spin />} />
      </div>
    );
  if (!data) return <div>Not Found</div>;

  return <FormComponent data={form} />;
};

export default Page;
