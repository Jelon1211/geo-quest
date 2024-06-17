import { useGlobalContext } from "../../context/GlobalProvider";
import Discover from "@/components/profile/Discover";
import LoggedUser from "@/components/profile/LoggedUser";
import { router } from "expo-router";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useGlobalContext();

  if (!user) {
    return <Discover />;
  }

  return <LoggedUser user={user} />;
};

export default Profile;
