export const userFields = [
  { name: "firstName", label: "First Name", type: "text", required: true, minLength: 2 },
  { name: "lastName", label: "Last Name", type: "text", required: true, minLength: 2 },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    pattern: "^[0-9]{10}$",
    helperText: "Enter 10 digit phone number",
  },
  { name: "email", label: "Email Address", type: "email", required: true },
];
