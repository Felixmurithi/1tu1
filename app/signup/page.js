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
export default function Signup() {
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
    <main className="relative">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-max absolute top-72 left-60 border p-4 grid gap-4 justify-start"
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
    </main>
  );
}

// the reason why the errors are not  registered is because the updated state is only available in the next render. the setter function is not synchronous, state is updated behind the scenes and only available in the next render. The setterf function should alos remian pure, the code in teh setter function will only update/ run in the next cycle. Any data mutations will not be recorded in the the currenct render and in the next cycle the funtion will be called.

// The email error is updated if tehre is any character cahnage because the onChange instantianties updateFormInput() and if the email  its true, the error is cleared by
