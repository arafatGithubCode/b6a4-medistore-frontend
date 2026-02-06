import { ProfileDisplay } from "@/components/module/profile/profile-display";
import { userServices } from "@/services/user-service";

const ProfilePage = async () => {
  const { data: session } = await userServices.getUserSession();
  const user = session?.user;
  return (
    <div className="container mx-auto py-8 px-4">
      {user ? <ProfileDisplay user={user} /> : null}
    </div>
  );
};

export default ProfilePage;
