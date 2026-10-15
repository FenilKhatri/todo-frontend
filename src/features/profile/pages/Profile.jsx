import { useEffect, useState } from "react";
import Alert from "../../../components/Alert";
import Loader from "../../../components/Loader";
import PageHeader from "../../../components/PageHeader";
import { getErrorMessage } from "../../../shared/lib/axios";
import useAuth from "../../auth/useAuth";
import { getProfile } from "../profile.api";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfileSummaryCard from "../components/ProfileSummaryCard";
import SecuritySection from "../components/SecuritySection";

function Profile() {
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch((err) => setError(getErrorMessage(err, "Unable to load profile")));
  }, []);

  const handleUpdated = (updated) => {
    setProfile(updated);
    updateUser((current) => ({
      ...current,
      userName: updated.userName,
      email: updated.email,
      profilePicture: updated.profilePicture,
    }));
  };

  if (error) return <Alert>{error}</Alert>;
  if (!profile) return <Loader label="Loading profile..." />;

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your personal information and account security." />
      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <ProfileSummaryCard profile={profile} onUpdated={handleUpdated} />
        <div className="space-y-6">
          <PersonalInfoForm profile={profile} onUpdated={handleUpdated} />
          <SecuritySection email={profile.email} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
