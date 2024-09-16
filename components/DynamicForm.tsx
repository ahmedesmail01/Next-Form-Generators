"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, CardBody } from "@nextui-org/react";
import { FormData } from "../interfaces";
import { createZodSchema } from "../utils/createZodSchema";
import { useMemo } from "react";
import { renderInput } from "../components/FormInputs";
//import { UseFormRegister } from "react-hook-form";

interface IProps {
  formData: FormData;
}

const DynamicForm = ({ formData }: IProps) => {
  const schema = useMemo(
    () => createZodSchema(formData.inputs),
    [formData.inputs]
  );

  type FormValues = z.infer<typeof schema>;

  console.log(
    formData.inputs.find((i) => i.name === "therapy_experience")?.options
  );

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: formData.inputs.reduce((acc, input) => {
      acc[input.name] = input.type === "checkbox" ? false : "";
      return acc;
    }, {} as FormValues),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="bg-gray-100 py-5 px-10 flex content-center items-center">
      <div className="flex h-screen bg-gray-200 rounded-xl w-full">
        <div
          dir="rtl"
          className="w-full md:w-1/2 flex items-center justify-center "
        >
          <Card className="w-full h-full py-8 px-4 rounded-sm  ">
            <CardBody className="overflow-scroll scrollbar-hide">
              <h2 className="text-2xl text-center font-bold mb-6">
                {formData.title}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {formData.inputs.map((input) => (
                  <div key={input._id} className="mb-4">
                    {renderInput(input, {
                      formData,
                      control,
                      register,
                      errors,
                    })}
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button color="danger" fullWidth variant="flat">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    isDisabled={!isValid}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
        <div className="hidden overflow-hidden  bg-red-500 relative md:block w-[50vw] h-full">
          <Image
            alt="Mountains"
            src={formData.banner}
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
