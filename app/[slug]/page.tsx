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

  if (formDetails.layout === "form_wz_banner") {
    return (
      <div className="w-full min-h-screen h-fit flex">
        {/* Left Box */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col pb-8 items-center justify-center p-8">
          <Image
            crossOrigin="anonymous"
            src={formDetails?.logo}
            width={200}
            height={200}
            className="!h-[100px] w-[200px] top-0 object-cover mb-4"
            alt=""
          />
          <h2 className="my-4 font-semibold text-xl">{formDetails?.title}</h2>

          <FormComponent form={formDetails as FormModel} />
        </div>

        <div className="hidden lg:block lg:w-1/2">
          <Image
            crossOrigin="anonymous"
            width={100}
            height={100}
            src={formDetails?.banner}
            alt="Banner"
            className="object-cover w-full h-screen sticky top-0 object-top"
          />
        </div>
      </div>
    );
  }

  if (formDetails.layout === "form_only") {
    return (
      <div className="w-[600px] border border-primary p-4 my-4 rounded-xl flex flex-col items-center justify-center m-auto max-w-full min-h-screen">
        <Image
          crossOrigin="anonymous"
          src={formDetails?.logo}
          width={200}
          height={200}
          className="!h-[100px] w-[200px] top-0 object-cover mb-4"
          alt=""
        />
        <h2 className="my-4 font-semibold text-xl">{formDetails?.title}</h2>
        <FormComponent form={formDetails as FormModel} />
      </div>
    );
  }

  return <div>Form not found</div>;
};

export default page;
