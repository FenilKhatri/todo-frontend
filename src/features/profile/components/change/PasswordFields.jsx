import PasswordField from "../../../../components/PasswordField";
import PasswordRules from "../../../../components/PasswordRules";

function PasswordFields({ form, errors, setField }) {
  return (
    <>
      <PasswordField
        id="current-password"
        label="Current password"
        autoComplete="current-password"
        autoFocus
        value={form.currentPassword}
        onChange={setField("currentPassword")}
        error={errors.currentPassword}
      />
      <PasswordField
        id="new-password"
        label="New password"
        autoComplete="new-password"
        value={form.newPassword}
        onChange={setField("newPassword")}
        error={errors.newPassword}
      />
      <PasswordRules password={form.newPassword} />
      <PasswordField
        id="confirm-password"
        label="Confirm new password"
        autoComplete="new-password"
        value={form.confirmPassword}
        onChange={setField("confirmPassword")}
        error={errors.confirmPassword}
      />
    </>
  );
}

export default PasswordFields;
