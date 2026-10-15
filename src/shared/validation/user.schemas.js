import { z } from "zod";

// Mirrors the backend rules for instant feedback. The server re-validates everything.

export const userNameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters long.")
  .max(12, "Name must be at most 12 characters long.");

export const emailSchema = z.string().trim().toLowerCase().email("Email must be valid.");

export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long.")
  .max(25, "Password must be at most 25 characters long.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Use upper and lower case letters, a number and a symbol (@$!%*?&).",
  );

// First message per field, e.g. { email: "Email must be valid." }.
export const fieldErrors = (issues = []) =>
  issues.reduce((errors, issue) => {
    const field = issue.path?.join?.(".") ?? issue.field;
    if (field && !errors[field]) errors[field] = issue.message;
    return errors;
  }, {});

export const serverFieldErrors = (error) => fieldErrors(error?.response?.data?.errors);
