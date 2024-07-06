import { useState } from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { icons, images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SignInFormState } from "@/types/formfield";
import LoginService from "@/services/loginService";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<SignInFormState>({
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState<string>();
  const { setIsLogged, isLogged } = useGlobalContext();

  if (isLogged) return <Redirect href="/home" />;

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);

    try {
      const { data, status } = await LoginService.loginAuth(form);
      if (status === 200) {
        setIsLogged(true);
        router.replace("/home");
      }
    } catch (error) {
      setResponseMessage("Can't log in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center px-4 my-3"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
          <View className="flex justify-center items-center pt-5 flex-row gap-2">
            {responseMessage && (
              <>
                <Text className={`text-lg text-red-500 font-pregular`}>
                  {responseMessage}
                </Text>
                <Image
                  source={icons.cancel}
                  className="mb-1 w-4 h-4"
                  resizeMode="contain"
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
