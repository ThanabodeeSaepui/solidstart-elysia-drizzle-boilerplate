/**
 * Shared validation utilities for form inputs
 */

export const validateEmail = (value: string): string => {
  if (!value) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Invalid email address";
  return "";
};

export const validatePassword = (value: string): string => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  return "";
};

export const validateName = (value: string): string => {
  if (!value) return "Name is required";
  if (value.length < 2) return "Name must be at least 2 characters";
  return "";
};

/**
 * Creates a field validator that returns error message or empty string
 */
export const createFieldValidator =
  <T extends string>(validator: (value: T) => string) =>
  (value: T): boolean =>
    validator(value) === "";
