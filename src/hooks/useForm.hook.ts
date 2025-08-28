import { useState } from "react";
import { valueExists } from "../helpers/valueExists";

type Validator<T extends object, K extends keyof T> =
  | { required: boolean }
  | ((value: T[K], values: T) => void | string);

type ValidationConfig<T extends object> = Partial<
  Record<keyof T, Validator<T, keyof T>>
>;
type ErrorState<T extends object> = Partial<Record<keyof T, string>>;
type RegisterFnReturn<T extends object> = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: () => void;
  value: T[keyof T];
};

interface UseFormProps<T extends object> {
  initialValues: T;
  validations?: ValidationConfig<T>;
}

export const useForm = <T extends object>(props: UseFormProps<T>) => {
  const [form, setForm] = useState<T>(props.initialValues);
  const [errors, setErrors] = useState<ErrorState<T>>({});

  const getFieldValue = (field: keyof T) => {
    return form[field];
  };

  const changeField = (field: keyof T, value: T[keyof T]) => {
    setForm((state) => ({
      ...state,
      [field]: value,
    }));
  };

  const hasError = (key: keyof T) => {
    return !!errors[key];
  };

  const validate = (setter?: (value: ErrorState<T>) => void) => {
    if (!props.validations) return undefined;
    const validators = props.validations;
    const validatorKeys = Object.keys(props.validations) as Array<keyof T>;
    let errorObj = {} as ErrorState<T>;
    validatorKeys.forEach((validatorKey) => {
      const validator = validators[validatorKey];
      if (!validator) return;
      if (typeof validator === "object") {
        const isRequired = validator.required;
        if (isRequired && !valueExists(getFieldValue(validatorKey))) {
          errorObj = {
            ...errorObj,
            [validatorKey]: "This field is required",
          };
        }
      }
      if (typeof validator === "function") {
        const result = validator(getFieldValue(validatorKey), form);
        if (result) {
          errorObj = {
            ...errorObj,
            [validatorKey]: result,
          };
        }
      }
    });
    if (setter) {
      setter(errorObj);
    }
    return errorObj;
  };

  const register = (field: keyof T): RegisterFnReturn<T> => ({
    onChange: (e) => {
      const value = e?.target?.value as T[keyof T];
      changeField(field, value);
    },
    onBlur: () => {
        validate(setErrors)
    },
    value: form[field],
  });

  const reset = () => {
    setForm(props.initialValues);
    setErrors({});
  };

  const handleSumbit =
    (success: (values: T) => void, error?: (errors: ErrorState<T>) => void) =>
    () => {
      const validationErrors = validate(setErrors);

      if (validationErrors && Object.keys(validationErrors || {}).length) {
        error?.(validationErrors);
      } else {
        success(form);
      }
    };

  return {
    values: form,
    errors,
    getFieldValue,
    register,
    handleSumbit,
    hasError,
    reset,
  };
};
