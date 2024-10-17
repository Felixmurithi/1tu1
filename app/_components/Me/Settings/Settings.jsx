"use client";

import { useState } from "react";

import verifyFormInputs from "@/app/_hooks/verifyFormInputs";

import { signup } from "@/app/_lib/action";
import FormRow from "@/app/_components/FormRow";
import Button from "@/app/_components/Button";
import Input from "@/app/_components/Input";

const formTemplate = [
  {
    firstName: {
      label: " First name",
      type: "text",
    },
  },
  {
    lastName: {
      label: "Last name",
      type: "text",
    },
  },

  {
    email: {
      label: "email",
      type: "email",
    },
  },

  {
    password: {
      label: "password",
      type: "password",
    },
  },
  {
    passwordConfirm: {
      label: "password Confirm",
      type: "password",
    },
  },
];

const formFields = formTemplate.map((field) => Object.entries(field)[0]);
const initialState = {};

formFields.forEach((field) => {
  if (field[1].type === "password") {
    initialState[field[0]] = { value: "", error: "" };
    initialState[`hide${field[0]}`] = true;
  } else initialState[field[0]] = { value: "", error: "" };
});
export default function Settings() {
  //state
  const [formState, setFormState] = useState(initialState);

  // submit handling functioning
  function handleSubmit(e) {
    e.preventDefault();
    const inputErrors = verifyFormInputs(formFields, formState, setFormState);

    if (inputErrors)
      signup({
        firstName: formState.firstName.value,
        lastName: formState.lastName.value,
        email: formState.email.value,
        password: formState.password.value,
      });
  }

  function updateFormInput(field, value) {
    if (value) {
      setFormState((state) => {
        return {
          ...state,
          [field]: {
            value,
            error: "",
          },
        };
      });
    } else
      setFormState((state) => {
        return {
          ...state,
          [field]: {
            value,
            error: `${field} is required`.toLowerCase(),
          },
        };
      });
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-max top-72 left-60 border p-4 grid gap-4 justify-start"
    >
      <h3>Signup</h3>

      {formFields.map((field, i) => (
        <FormRow
          key={i}
          label={field[1].label}
          error={formState[field[0]].error}
        >
          <Input
            // disabled={isLoading}
            type={
              formState[`hide${field[0]}`] === false ? "text" : field[1].type
            }
            // type={field[1].type}
            name={field[0]}
            id={field[0]}
            onChange={(e) => updateFormInput(`${field[0]}`, e.target.value)}
          />
          {formState[`hide${field[0]}`] === true ||
          formState[`hide${field[0]}`] === false ? (
            <Input
              type="checkbox"
              checked={!formState[`hide${field[0]}`]}
              onChange={(e) =>
                setFormState((state) => {
                  return {
                    ...state,
                    [`hide${field[0]}`]: e.target.checked,
                  };
                })
              }
            />
          ) : (
            ""
          )}
        </FormRow>
      ))}

      <Button>Submit</Button>
    </form>
  );
}
