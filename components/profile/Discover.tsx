import { View, Text, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { images } from "../../constants";
import { AuthService } from "@/services/authService";

const Discover = () => {
  const handleLogin = async () => {
    await AuthService.initiateAuthSession();
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="w-full flex justify-center items-center min-h-[85h] px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />

            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless{"\n"}
                Possibilities with{" "}
                <Text className="text-secondary-200">GeoQuest</Text>
              </Text>

              <Image
                source={images.path}
                className="w-[138px] h-[20px] absolute -bottom-4 right-12"
                resizeMode="contain"
              />
            </View>

            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with GeoQuest
            </Text>

            <CustomButton
              title="Login"
              handlePress={handleLogin}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Discover;
