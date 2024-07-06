import { View, Text, Image } from "react-native";
import { images } from "../constants";
import { useGlobalContext } from "@/context/GlobalProvider";

const Heading = () => {
  const { user } = useGlobalContext();

  return (
    <View className="flex justify-between items-start flex-row mb-6">
      <View>
        <Text className="font-pmedium text-sm text-gray-100">
          Welcome {user ? "Back" : ""}
        </Text>
        <Text className="text-2xl font-psemibold text-white">
          {user ? `${user.first_name} ${user.last_name}` : "You!"}
        </Text>
      </View>
      <View className="mt-1.5">
        <Image
          source={images.logoSmall}
          className="w-9 h-10"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default Heading;
