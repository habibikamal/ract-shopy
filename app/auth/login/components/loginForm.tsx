"use client";

import { Formik, Form } from "formik";
import * as yup from "yup";
import Input from "@/app/shared/components/input";
import { InterfaceLoginFormValues } from "@/app/contracts/auth/modelAuth";
import callApi from "@/app/helpers/callApi";



const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Minimum 6 chars"),
});

export default function LoginForm() {
  const initialValues: InterfaceLoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {

      
        console.log("Form Submitted:", values);
      }}
    >
      <Form className="space-y-6">
        <Input name="email" type="email" label="Email Address" />
        <Input name="password" type="password" label="Password" />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold"
        >
          Login
        </button>
      </Form>
    </Formik>
  );
}
