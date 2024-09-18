// app/page.tsx
//import { Button } from "@nextui-org/button";

import DynamicForm from "@/components/DynamicForm";
import { FormData } from "@/interfaces";

export const formData: FormData = {
  _id: "66d42898cd31e64aa13383a5",
  type: "online",
  layout: "centered",
  banner: "https://managethenow.com/forms/together/images/together.png",
  video: "https://youtu.be/PL3Odw-k8W4?si=aqI8cHVyQgqTZaC0",
  logo: "https://managethenow.com/forms/together/images/together.svg",
  title: "مع بعض متكلمين",
  color_scheme: {
    primary: "#010066",
    secondary: "#D32F2F",
    tertiary: "#CDDC39",
    _id: "66d42898cd31e64aa13383a6",
  },
  font: "Arial",
  max_seat: 100,
  form_slug: "Elsokr",
  inputs: [
    {
      _id: "66d42898cd31e64aa133839d",
      type: "text", // Explicitly match the expected string literal type
      label: "الأسم",
      placeholder: "Enter your full name",
      required: true,
      options: [],
      input_id: 1,
      name: "full_name",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.675Z",
      updatedAt: "2024-09-01T08:40:56.675Z",
    },
    {
      _id: "66d42898cd31e64aa133839e",
      type: "email", // Explicitly match the expected string literal type
      label: "البريد الالكتروني",
      placeholder: "Enter your email address",
      required: true,
      options: [],
      input_id: 2,
      name: "email",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.675Z",
      updatedAt: "2024-09-01T08:40:56.675Z",
    },
    {
      _id: "66d42898cd33e64aa133839d",
      type: "text", // Explicitly match the expected string literal type
      label: "الوظيفة",
      placeholder: "Enter your job",
      required: true,
      options: [],
      input_id: 1,
      name: "job",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.675Z",
      updatedAt: "2024-09-01T08:40:56.675Z",
    },
    {
      _id: "66d42898cd31e64aa133839f",
      type: "phone", // Explicitly match the expected string literal type
      label: "رقم الهاتف",
      placeholder: "Enter your phone number",
      required: true,
      options: [],
      input_id: 3,
      name: "phone",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.676Z",
      updatedAt: "2024-09-01T08:40:56.676Z",
    },
    {
      _id: "66d42898cd31e64aa13383a0",
      type: "select", // Explicitly match the expected string literal type
      label: "Preferred Session Time",
      required: true,
      options: ["Morning", "Afternoon", "Evening"],
      input_id: 4,
      name: "session_time",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.676Z",
      updatedAt: "2024-09-01T08:40:56.676Z",
    },

    {
      _id: "66d42898cd31e64aa13383a1",
      type: "checkbox", // Explicitly match the expected string literal type
      label: "Agree to Terms and Conditions",
      required: true,
      options: [],
      input_id: 5,
      name: "terms",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.676Z",
      updatedAt: "2024-09-01T08:40:56.676Z",
    },
    {
      _id: "66d42898pd31e64aa13383a2",
      type: "radio", // Explicitly match the expected string literal type
      label: "I am depending on terms?",
      required: false,
      options: ["hi", "bye"],
      input_id: 12,
      name: "dependimg on terms",
      dependent_on: "terms",
      dependent_value: true,
      __v: 0,
      createdAt: "2024-09-01T08:40:56.676Z",
      updatedAt: "2024-09-01T08:40:56.676Z",
    },
    {
      _id: "66d428998cd31e64aa13383a2",
      type: "radio", // Explicitly match the expected string literal type
      label: "Have you attended therapy before?",
      required: true,
      options: ["Yes", "No"],
      input_id: 6,
      name: "therapy_experience",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.676Z",
      updatedAt: "2024-09-01T08:40:56.676Z",
    },
    {
      _id: "66d42898cd31e64aa13383a2",
      type: "text", // Explicitly match the expected string literal type
      label: "conditional rendering?",
      required: false,
      options: [],
      input_id: 12,
      name: "conditional_rendering",
      dependent_on: "therapy_experience",
      dependent_value: "Yes",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.676Z",
      updatedAt: "2024-09-01T08:40:56.676Z",
    },
    {
      _id: "66d42898cd31e64aa13383a3",
      type: "country", // Explicitly match the expected string literal type
      label: "Country of Residence",
      required: true,
      options: [],
      input_id: 7,
      name: "country",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.676Z",
      updatedAt: "2024-09-01T08:40:56.676Z",
    },
  ],
  __v: 0,
};
export default function Page() {
  //# data fetched

  //# end data fetched

  return (
    <div>
      <DynamicForm formData={formData} />
    </div>
  );
}
