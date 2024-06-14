import { View } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { IItem } from "@/types/itemservice";
import { images } from "@/constants";
import MenuButton from "./MenuButton";
import ListProfileIcon from "./ListProfileIcon";
import ListTitle from "./ListTitle";
import ListPicture from "./ListPicture";

const ListItem = ({ item }: { item: IItem }) => {
  return (
    <View className="px-4 mb-14">
      <View className="flex flex-row items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <ListProfileIcon icon={icons.profile} />
          <ListTitle
            uuid={item.uuid}
            title={item.title}
            created_by={item.created_by}
            is_deleted={item.is_deleted}
          />
        </View>

        <MenuButton icon={icons.menu} uuid={item.uuid} geo={item.geo} />
      </View>
      <ListPicture uuid={item.uuid} image={images.thumbnail} />
    </View>
  );
};

export default ListItem;
