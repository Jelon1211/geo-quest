import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "@/services/authService";
import { useGlobalContext } from "@/context/GlobalProvider";

const Index = () => {
  const { setUser } = useGlobalContext();

  useEffect(() => {
    const prepareToken = async () => {
      const refreshToken = await AsyncStorage.getItem("refresh_token");
      if (!refreshToken) {
        return;
      }
      const data = await AuthService.refreshAuthSession(refreshToken);
      const { user } = data;

      setUser(user);
    };
    prepareToken();
  }, []);

  return <Redirect href="/home" />;
};

export default Index;
