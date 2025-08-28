import { PasswordInput } from "../PasswordInput/PasswordInput";
import { conditionalClassNames } from "../../helpers/conditionalClassnames";
import { useSignUpFormMutation } from "./SignUpForm.data-handler";
import { useForm } from "../../hooks/useForm.hook";
import "./SignUpForm.css";
import { Alert } from "../Alert/Alert";

export const SignUpForm = () => {
  const { register, errors, handleSumbit, hasError, reset } = useForm({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validations: {
      username: { required: true },
      password: { required: true },
      confirmPassword: (value, values) => {
        if (!value) {
          return "Password confirmation is required";
        }
        if (value !== values.password) {
          return "Passwords should be equal";
        }
      },
    },
  });
  const { data, error, loading, mutate } = useSignUpFormMutation();

  return (
    <div>
      <div className="signup-form-header">
        <h1>Sign Up</h1>
        <p>Please fill in the form below to create an account.</p>
      </div>
      {error && (
        <Alert style={{ margin: "16px 0" }} variant="error">
          {error.message}
        </Alert>
      )}
      {data && (
        <Alert style={{ margin: "16px 0" }} variant="success">
          The user has been created successfully.
        </Alert>
      )}
      <div className="signup-form-container">
        <div
          className={conditionalClassNames([
            ["signup-form-field", true],
            ["error", hasError("username")],
          ])}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            disabled={loading}
            {...register("username")}
          />
          {!!errors?.username && (
            <span className="signup-form-error-label">{errors.username}</span>
          )}
        </div>
        <div
          className={conditionalClassNames([
            ["signup-form-field", true],
            ["error", hasError("password")],
          ])}
        >
          <label htmlFor="password">Password</label>
          <PasswordInput
            id="password"
            name="password"
            disabled={loading}
            {...register("password")}
          />
          {!!errors?.password && (
            <span className="signup-form-error-label">{errors.password}</span>
          )}
        </div>
        <div
          className={conditionalClassNames([
            ["signup-form-field", true],
            ["error", hasError("username")],
          ])}
        >
          <label htmlFor="confirmPassword">Confirm Password</label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            {...register("confirmPassword")}
            disabled={loading}
          />
          {!!errors?.confirmPassword && (
            <span className="signup-form-error-label">
              {errors.confirmPassword}
            </span>
          )}
        </div>
        <button
          className="signup-form-button"
          disabled={loading}
          type="button"
          onClick={handleSumbit(async (data) => {
            const response = await mutate({
              username: data.username,
              password: data.password,
            });
            if (response) {
              reset();
            }
          })}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};
