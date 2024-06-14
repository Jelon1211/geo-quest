import { View, Image } from "react-native";
import React from "react";
import { IListProfileIcon } from "@/types/list";

const ListProfileIcon: React.FC<IListProfileIcon> = ({ icon }) => {
  return (
    <View className="w-10 h-10 rounded-lg border border-secondary flex justify-center items-center p-0.5">
      <Image
        source={icon}
        className="w-full h-full rounded-lg"
        resizeMode="cover"
      />
    </View>
  );
};

export default ListProfileIcon;
