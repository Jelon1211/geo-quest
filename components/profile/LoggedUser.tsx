import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons, images } from "../../constants";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import EmptyState from "@/components/EmptyState";
import InfoBox from "@/components/InfoBox";
import ListItem from "@/components/list/ListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoggedUser = ({ user }: any) => {
  const { setUser, setAccessToken } = useGlobalContext();

  const [items, setItems] = useState([]);

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    await AsyncStorage.removeItem("refresh_token");

    router.replace("/");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <ListItem item={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Games Found"
            subtitle="No games found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{
                  uri: user.profile_picture_url,
                }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={`${user.first_name} ${user.last_name}`}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={"0"}
                subtitle="Games"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox title="0" subtitle="Followers" titleStyles="text-xl" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default LoggedUser;
