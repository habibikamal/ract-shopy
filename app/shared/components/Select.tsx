"use client";

import { Field } from "formik";
import FieldWrapper from "./FieldWrapper";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  name: string;
  label?: string;
  options: Option[];
}

export default function Select({ name, label, options }: SelectProps) {
  return (
    <FieldWrapper name={name} label={label}>
      <Field
        as="select"
        id={name}
        name={name}
        className="block w-full rounded-md bg-white px-3 py-2 
        outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
      >
        <option value="">انتخاب کنید...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>
    </FieldWrapper>
  );
}
