
import { FC } from "react";
import { Field, ErrorMessage } from "formik";

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  inputClassName?: string;
  errorClassName?: string;
  labelClassName?:string
}

const Input: FC<InputProps> = ({
  name,
  label,
  type = "text",
  inputClassName = "",
  errorClassName = "text-red-500 text-sm mt-1",
  labelClassName="block text-sm font-mediom text-gray-700"
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className={labelClassName || "block text-sm font-medium text-gray-900"}
        >
          {label}
        </label>
      )}

      <div className="mt-2">
        <Field
          id={name}
          name={name}
          type={type}
          className={
            inputClassName ||
            "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          }
        />

        <ErrorMessage
          name={name}
          component="div"
          className={errorClassName}
        />
      </div>
    </div>
  );
};

export default Input;
