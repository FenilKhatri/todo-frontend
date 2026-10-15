import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { LuSave, LuUser } from "react-icons/lu";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { FieldLabel, shellInputClass } from "../../../components/ModalShell";
import { getErrorMessage } from "../../../shared/lib/axios";
import { updateProfile } from "../profile.api";
import { fieldErrors, profileSchema, serverFieldErrors } from "../profile.schemas";

function PersonalInfoForm({ profile, onUpdated }) {
  const [userName, setUserName] = useState(profile.userName);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const dirty = userName.trim() !== profile.userName;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaved(false);
    const parsed = profileSchema.safeParse({ userName });
    if (!parsed.success) {
      setError(fieldErrors(parsed.error.issues).userName);
      return;
    }

    setSaving(true);
    try {
      const updated = await updateProfile(parsed.data);
      setUserName(updated.userName);
      onUpdated(updated);
      setSaved(true);
    } catch (err) {
      setError(serverFieldErrors(err).userName || getErrorMessage(err, "Unable to update profile"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Personal information" icon={LuUser} description="This name is shown to people you share boards with.">
      <form onSubmit={handleSubmit} noValidate className="grid gap-5 p-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="profile-name" hint={`${userName.length}/12`}>
            Name
          </FieldLabel>
          <input
            id="profile-name"
            value={userName}
            maxLength={12}
            onChange={(event) => {
              setUserName(event.target.value);
              setError("");
              setSaved(false);
            }}
            aria-invalid={Boolean(error)}
            className={`${shellInputClass} h-12 ${error ? "border-red-400" : ""}`}
          />
          {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <p className="flex h-12 items-center truncate rounded-xl bg-slate-50 px-4 text-sm text-slate-500">
            {profile.email}
          </p>
        </div>
        <div className="flex items-center gap-3 sm:col-span-2">
          <Button type="submit" loading={saving} disabled={!dirty} size="lg">
            {!saving && <LuSave size={16} />} Save changes
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600">
              <FiCheck /> Saved
            </span>
          )}
        </div>
      </form>
    </Card>
  );
}

export default PersonalInfoForm;
