"use client";

import { Field } from "formik";
import FieldWrapper from "./FieldWrapper";

interface RadioOption {
  value: string | number;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  direction?: "row" | "col";
}

export default function RadioGroup({
  name,
  label,
  options,
  direction = "row",
}: RadioGroupProps) {
  return (
    <FieldWrapper name={name} label={label}>
      <div className={`flex ${direction === "row" ? "gap-4" : "flex-col gap-2"}`}>
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm">
            <Field
              type="radio"
              name={name}
              value={String(opt.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}
