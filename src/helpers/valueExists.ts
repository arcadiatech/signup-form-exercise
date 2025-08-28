/**
 * @description Checks if a value exists.
 * @param value - The value to check.
 * @returns True if the value exists, false otherwise.
 */

export const valueExists = (value: unknown) => {
  if (typeof value === "string") {
    return !!value || value.trim().length > 0;
  }
  if (typeof value === "number") {
    return value === 0 || !!value;
  }
  return true;
};
