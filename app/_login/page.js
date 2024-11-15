"use client";

import { useForm } from "react-hook-form";
import FormRow from "@/app/_components/FormRow";
import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";

export default function Page() {
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });
  const { errors } = formState;

  return (
    <main className="grid place-items-center">
      <form className="w-[60%] h-fit  border p-4 grid gap-4 justify-start">
        <h3>Login</h3>

        <FormRow label="email" id="lastName" error={errors.email?.message}>
          <Input
            id="firstName"
            reactHooKFormValidate={{
              ...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "provide a valid email",
                },
              }),
            }}
          />
        </FormRow>

        <FormRow label={"password"} error={errors.password?.message}>
          <Input
            reactHooKFormValidate={{
              ...register("password", {
                required: "THis field is required",
                minLength: {
                  value: 8,
                  message: "Password needs to be atleast 8 characters",
                },
              }),
            }}
          />
        </FormRow>

        <Button>Submit</Button>
      </form>
    </main>
  );
}
