// interfaces.ts
export interface InputField {
  _id: string;
  type:
    | "text"
    | "email"
    | "phone"
    | "select"
    | "checkbox"
    | "radio"
    | "country";
  label: string;
  placeholder?: string;
  required: boolean;
  dependent_on?: number;
  is_dependent?: boolean;
  dependent_value?: string | boolean;
  options?: string[];
  input_id: number;
  name: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface FormData {
  _id: string;
  type: string;
  layout: string;
  banner: string;
  video: string;
  logo: string;
  title: string;
  color_scheme: {
    primary: string;
    secondary: string;
    tertiary: string;
    _id: string;
  };
  font: string;
  max_seat: number;
  form_slug: string;
  inputs: InputField[];
  __v: number;
}
