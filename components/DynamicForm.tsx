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

interface IProps {
  formData: FormData;
}

const DynamicForm = ({ formData }: IProps) => {
  const schema = useMemo(
    () => createZodSchema(formData.inputs),
    [formData.inputs]
  );

  type FormValues = z.infer<typeof schema>;

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: formData.inputs.reduce((acc, input) => {
      acc[input.name as keyof FormValues] =
        input.type === "checkbox" ? false : "";
      return acc;
    }, {} as FormValues),
  });

  const formValues = watch();

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="bg-gray-100   lg:px-10 flex content-center items-center">
      <div className="flex h-screen bg-gray-200 rounded-xl w-full">
        <div
          dir="rtl"
          className="w-full md:w-1/2 flex items-center justify-center "
        >
          <Card className="w-full relative overflow-scroll scrollbar-hide  h-full py-8 px-4 rounded-sm flex  flex-col items-center">
            <CardBody className="scrollbar-hide flex   ">
              <div className="grid items-center content-center">
                <Image
                  src={formData.logo}
                  width={150}
                  height={150}
                  alt="logo"
                  className="m-auto"
                />
              </div>

              <h2 className="text-xl lg:text-2xl text-center font-bold mb-6">
                {formData.title}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {formData.inputs.map((input) => {
                  // Check if the input has dependencies
                  if (input.dependent_on && input.dependent_value) {
                    // Get the value of the dependent field from the form values
                    const dependentValue =
                      formValues[input.dependent_on as keyof FormValues];

                    // If the dependent value doesn't match, don't render this input
                    if (dependentValue !== input.dependent_value) {
                      return null;
                    }
                  }

                  return (
                    <div key={input._id} className="mb-4">
                      {renderInput<FormValues>(input, {
                        control,
                        register,
                        errors,
                      })}
                    </div>
                  );
                })}
                <div className="text-center">
                  <Button
                    type="submit"
                    fullWidth
                    variant="bordered"
                    isDisabled={!isValid}
                    style={{
                      borderColor: `${formData.color_scheme.primary}`,
                      color: `${formData.color_scheme.primary}`,
                    }}
                    className={`w-[150px] border-2 md:w-[342px] max-w-full py-3 mx-auto rounded-full font-bold flex-1`}
                  >
                    تسجيل
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
        <div className="hidden overflow-hidden relative md:block w-[50vw] h-full">
          <Image
            alt="Banner"
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
