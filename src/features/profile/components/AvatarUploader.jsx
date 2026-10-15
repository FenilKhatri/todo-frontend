import { useEffect, useRef, useState } from "react";
import { LuCamera, LuTrash2, LuUpload } from "react-icons/lu";
import Avatar from "../../../components/Avatar";
import { getErrorMessage } from "../../../shared/lib/axios";
import { removeAvatar, uploadAvatar } from "../profile.api";
import { avatarFileSchema, serverFieldErrors } from "../profile.schemas";
import { AVATAR_TYPES } from "../profile.constants";

function AvatarUploader({ profile, onUpdated }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    const parsed = avatarFileSchema.safeParse(file);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setPreview(URL.createObjectURL(file));
    setBusy("upload");
    try {
      onUpdated(await uploadAvatar(file));
    } catch (err) {
      setError(Object.values(serverFieldErrors(err))[0] || getErrorMessage(err, "Upload failed"));
    } finally {
      setPreview(null);
      setBusy(null);
    }
  };

  const handleRemove = async () => {
    setError("");
    setBusy("remove");
    try {
      onUpdated(await removeAvatar());
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't remove the image"));
    } finally {
      setBusy(null);
    }
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar user={profile} src={preview ?? undefined} size="xl" className="ring-4 ring-white" />
        {busy && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/40">
            <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          </span>
        )}
        <button
          type="button"
          onClick={openPicker}
          disabled={Boolean(busy)}
          aria-label="Change profile photo"
          className="absolute right-0 bottom-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-brand-500 text-white shadow-md ring-3 ring-white hover:bg-brand-600 disabled:cursor-not-allowed"
        >
          <LuCamera size={16} />
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={AVATAR_TYPES.join(",")}
        onChange={handleFile}
        className="hidden"
      />

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={openPicker}
          disabled={Boolean(busy)}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 disabled:opacity-50"
        >
          <LuUpload size={14} /> {profile.profilePicture ? "Change photo" : "Upload photo"}
        </button>
        {profile.profilePicture && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={Boolean(busy)}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-50"
          >
            <LuTrash2 size={14} /> Remove
          </button>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-400">JPG, PNG, WEBP or GIF · under 5 MB</p>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default AvatarUploader;
