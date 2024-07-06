import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Image, Alert } from "react-native";

import { icons, images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { SignUpFormState } from "@/types/formfield";
import LoginService from "@/services/loginService";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<SignUpFormState>({
    name: "",
    email: "",
    password: "",
    isActive: true,
  });
  const [responseMessage, setResponseMessage] = useState<string>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const submit = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);
    setResponseMessage("");
    try {
      const { data, status } = await LoginService.createUser(form);
      setResponseMessage(data.message);
      setIsSuccess(status === 201);
    } catch (error) {
      setResponseMessage("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-10">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to GeoQuest
          </Text>

          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
          <View className="flex justify-center items-center pt-5 flex-row gap-2">
            {responseMessage && (
              <>
                <Text
                  className={`text-lg ${
                    isSuccess ? "text-green-500" : "text-red-500"
                  } font-pregular`}
                >
                  {responseMessage}
                </Text>
                <Image
                  source={isSuccess ? icons.checked : icons.cancel}
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

export default SignUp;
