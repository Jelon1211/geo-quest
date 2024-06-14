import { useGlobalContext } from "../../context/GlobalProvider";
import Discover from "@/components/profile/Discover";
import LoggedUser from "@/components/profile/LoggedUser";
import { router } from "expo-router";
import { useEffect } from "react";

const Profile = () => {
  const { isLogged } = useGlobalContext();

  useEffect(() => {
    router.push({
      pathname: "test",
    });
  }, []);

  if (!isLogged) {
    return <Discover />;
  }

  return <LoggedUser />;
};

export default Profile;
