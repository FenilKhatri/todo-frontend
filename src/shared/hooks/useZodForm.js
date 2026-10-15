import { useCallback, useState } from "react";
import { getErrorMessage } from "../lib/axios";
import { fieldErrors, serverFieldErrors } from "../validation/user.schemas";

export default function useZodForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const setField = useCallback(
    (field) => (event) => {
      const { type, checked, value } = event.target;
      setValues((current) => ({ ...current, [field]: type === "checkbox" ? checked : value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    },
    [],
  );

  const handleServerError = useCallback((error, fallback) => {
    const fields = serverFieldErrors(error);
    if (Object.keys(fields).length) setErrors(fields);
    else setFormError(getErrorMessage(error, fallback));
  }, []);

  const submitWith =
    ({ schema, action, fallback = "Something went wrong", pick = (data) => data }) =>
    async (event) => {
      event?.preventDefault();
      setFormError("");
      const parsed = schema.safeParse(pick(values));
      if (!parsed.success) {
        setErrors(fieldErrors(parsed.error.issues));
        return;
      }
      setErrors({});
      setSubmitting(true);
      try {
        await action(parsed.data);
      } catch (error) {
        handleServerError(error, fallback);
      } finally {
        setSubmitting(false);
      }
    };

  return { values, setValues, errors, formError, submitting, setField, submitWith, handleServerError };
}
