"use client";

import { FC, ReactNode } from "react";
import { ErrorMessage } from "formik";

interface FieldWrapperProps {
  name: string;
  label?: string;
  children: ReactNode;
  description?: string;
}

const FieldWrapper: FC<FieldWrapperProps> = ({ name, label, children, description }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {children}

      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  );
};

export default FieldWrapper;
