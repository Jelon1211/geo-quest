import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { AuthService } from "@/services/authService";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { TokenStorage } from "@/services/storageService";

const Callback = () => {
  const router = useRouter();

  const { code } = useLocalSearchParams();
  const { setUser, setAccessToken } = useGlobalContext();

  const [isError, setIsError] = useState(true);

  useEffect(() => {
    setIsError(false);
    const userCall = async () => {
      try {
        if (typeof code === "string") {
          const data = await AuthService.exchangeCodeForToken(code);
          const { refresh_token, access_token, user } = data;

          const backendData = await AuthService.registerUser(access_token);

          console.log(backendData);
          if (backendData) {
            setUser(user);
            setAccessToken(access_token);
            await TokenStorage.setItem("refresh_token", refresh_token);
            router.push({
              pathname: "home",
            });
          } else {
            setIsError(true);
          }
        } else {
          console.error("Code is not a string");
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    };

    if (code) {
      userCall();
    }
  }, [code]);

  const handleLogin = async () => {
    await AuthService.initiateAuthSession();
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
          Authorizing...
        </Text>
        {isError ? (
          <View className="w-full ">
            <View className="flex justify-center items-center">
              <Text className="font-semibold text-white mt-10 font-psemibold">
                Error during authorizing, please try again
              </Text>
            </View>
            <CustomButton
              title="Sign Up"
              handlePress={handleLogin}
              containerStyles="mt-2"
              isLoading={!isError}
            />
          </View>
        ) : (
          ""
        )}
      </View>
    </SafeAreaView>
  );
};

export default Callback;
