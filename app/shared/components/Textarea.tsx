"use client";

import { Field } from "formik";
import FieldWrapper from "./FieldWrapper";

interface TextareaProps {
  name: string;
  label?: string;
  rows?: number;
  placeholder?: string;
}

export default function Textarea({
  name,
  label,
  rows = 3,
  placeholder,
}: TextareaProps) {
  return (
    <FieldWrapper name={name} label={label}>
      <Field
        as="textarea"
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 
        outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
      />
    </FieldWrapper>
  );
}
