export default function verifyFormInputs(formFields, formState, setFormState) {
  const errors = {};
  formFields.forEach((field) => (errors[field[0]] = ""));

  // check all are filled
  formFields.forEach((field) => {
    if (!formState[field[0]].value) {
      errors[field[0]] = `${field[0]} is required`;
      setFormState((state) => {
        return {
          ...state,
          [field[0]]: {
            value: formState[field[0]].value,
            error: `${field[1].label} is required`.toLowerCase(),
          },
        };
      });
    }
  });

  if (
    !formState.email.value.includes("@") ||
    !formState.email.value.includes(".")
  ) {
    errors.email = "enter correct email format";
    setFormState((state) => {
      return {
        ...state,
        email: {
          value: state.email.value,
          error: "enter correct email format",
        },
      };
    });
  } else {
    errors.email = "";
    setFormState((state) => {
      return {
        ...state,
        email: {
          value: state.email.value,
          error: "",
        },
      };
    });
  }

  if (formState.password.value.length < 8) {
    errors.password = "check password length";
    setFormState((state) => {
      return {
        ...state,
        password: {
          value: state.password.value,
          error: "check password length",
        },
      };
    });
  }

  if (formState.password.value !== formState.passwordConfirm.value) {
    errors.passwordConfirm = "the passwords do not match";
    setFormState((state) => {
      return {
        ...state,
        passwordConfirm: {
          value: state.passwordConfirm.value,
          error: "the passwords do not match",
        },
      };
    });
  }

  const allInputsFilled = Object.values(errors)
    .map((err) => {
      if (err) return true;
      else return false;
    })
    .find((err) => err === true);

  const inputsError = allInputsFilled === undefined ? true : false;

  return inputsError;
}
