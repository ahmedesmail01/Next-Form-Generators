// app/page.tsx
//import { Button } from "@nextui-org/button";

import DynamicForm from "@/components/DynamicForm";
import { FormData } from "@/interfaces";

export const formData: FormData = {
  _id: "66d42898cd31e64aa13383a5",
  type: "online",
  layout: "centered",
  banner:
    "https://images.unsplash.com/photo-1683438049760-6fab2112f25a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVjdHVyZSUyMGhhbGxzfGVufDB8fDB8fHww",
  video: "https://youtu.be/PL3Odw-k8W4?si=aqI8cHVyQgqTZaC0",
  logo: "data:image/jpeg;base64,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",
  title: "محاضرة الشفاء الذاتي",
  color_scheme: {
    primary: "#4CAF50",
    secondary: "#8BC34A",
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
      label: "Full Name",
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
      label: "Email Address",
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
      _id: "66d42898cd31e64aa133839f",
      type: "phone", // Explicitly match the expected string literal type
      label: "Phone Number",
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
      _id: "66d42892cd31e64aa133839d",
      type: "text", // Explicitly match the expected string literal type
      label: "الاسم",
      placeholder: "ادخل اسمك",
      required: true,
      options: [],
      input_id: 10,
      name: "الاسم",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.675Z",
      updatedAt: "2024-09-01T08:40:56.675Z",
    },
    {
      _id: "66d49892cd31e64aa133839d",
      type: "text", // Explicitly match the expected string literal type
      label: "اي حاجه",
      placeholder: "ادخل اي حاجة",
      required: false,
      options: [],
      input_id: 11,
      name: "اي حاجة",
      __v: 0,
      createdAt: "2024-09-01T08:40:56.675Z",
      updatedAt: "2024-09-01T08:40:56.675Z",
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
      _id: "66d42898cd31e64aa13383a2",
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
      required: true,
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
