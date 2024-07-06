import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { AuthService } from "@/services/authService";
import { useRouter, useLocalSearchParams } from "expo-router";

const Callback = () => {
  const router = useRouter();

  const { code } = useLocalSearchParams();
  const { setUser, setAccessToken } = useGlobalContext();

  useEffect(() => {
    console.log(code);
    const userCall = async () => {
      try {
        if (typeof code === "string") {
          const data = await AuthService.exchangeCodeForToken(code);

          const { access_token, user } = data;

          console.log(data);

          setUser(user);
          setAccessToken(access_token);
          router.push({
            pathname: "home",
          });
        } else {
          console.error("Code is not a string");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (code) {
      userCall();
    }
  }, [code]);

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Authorizing...</Text>
    </View>
  );
};

export default Callback;
