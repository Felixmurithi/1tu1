"use client";

import FormRow from "@/app/_components/FormRow";
import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";

import { useForm } from "react-hook-form";

export default function Page() {
  // const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });
  const { errors } = formState;

  return (
    <form className="w-max absolute top-72 left-60 border p-4 grid gap-4 justify-start">
      <FormRow
        label="firstName"
        id="firstName"
        error={errors.firstName?.message}
      >
        <Input
          id="firstname"
          reactHooKFormValidate={{
            ...register("firstName", { required: "This field is required" }),
          }}
        />
      </FormRow>
      <FormRow
        label="firstName"
        id="lastName"
        error={errors.firstName?.message}
      >
        <Input
          id="firstName"
          reactHooKFormValidate={{
            ...register("firstName", { required: "This field is required" }),
          }}
        />
      </FormRow>

      <FormRow
        label="firstName"
        id="lastName"
        error={errors.firstName?.message}
      >
        <Input
          id="firstName"
          reactHooKFormValidate={{
            ...register("firstName", { required: "This field is required" }),
          }}
        />
      </FormRow>

      <FormRow label="email" id="lastName" error={errors.firstName?.message}>
        <Input
          id="firstName"
          reactHooKFormValidate={{
            ...register("firstName", { required: "This field is required" }),
          }}
        />
      </FormRow>

      <FormRow></FormRow>
      <Button></Button>
    </form>
  );
}
