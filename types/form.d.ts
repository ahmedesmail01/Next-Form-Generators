type FormDetails = {
  id: string;
  attendance_type: "offline" | "offline-online" | "webinar" | "online" | null;
  type: string;
  layout: string;
  banner: string | null;
  video: string | null;
  logo: string;
  title: string;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  font: string | null;
  max_seat: number | null;
  sections_count: number | null;
  sections: Section[];
  form_slug: string;
  user_id: string;
  booked_seats_count: number | null;
  project_name: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
};

type InputField = {
  id: string;
  label: string;
  type: "text" | "email" | "select" | "number" | "radio" | "checkbox";
  placeholder: string | null;
  required: boolean;
  options?: InputOption[]; // Replace `any` with the appropriate type if known
  name: string;
  dependant_on: string | null;
  dependant_value: string | null;
  on_select_message: string | null;
  form_id: string;
};

type GetFormResponse = {
  form: FormDetails;
  inputs: InputField[];
};

type InputOption = {
  label: string;
  value: string;
  avatar?: string;
};

type Seat = {
  seat: number;
  is_booked: boolean;
};

type Section = {
  seats: Seat[];
};

type Sections = Section[];
