import { TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { router } from "expo-router";
import { IListPicture } from "@/types/list";

const ListPicture: React.FC<IListPicture> = ({ uuid, image }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
      onPress={() =>
        router.push({
          pathname: "item-details",
          params: {
            itemUuid: uuid,
          },
        })
      }
    >
      <Image
        source={image}
        className="w-full h-full rounded-xl mt-3"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default ListPicture;
