import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import { AuthService } from "@/services/authService";
import { useGlobalContext } from "@/context/GlobalProvider";
import { TokenStorage } from "@/services/storageService";

const Index = () => {
  const { setUser, setAccessToken } = useGlobalContext();

  useEffect(() => {
    const prepareToken = async () => {
      const refreshToken = await TokenStorage.getItem("refresh_token");
      if (!refreshToken) {
        return;
      }
      const data = await AuthService.refreshAuthSession(refreshToken);
      const { user, access_token } = data;

      const backendData = await AuthService.registerUser(access_token);

      if (backendData) {
        setUser(user);
        setAccessToken(access_token);
      }
    };
    prepareToken();
  }, []);

  return <Redirect href="/home" />;
};

export default Index;
