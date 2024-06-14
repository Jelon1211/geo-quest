import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { IListTitle } from "@/types/list";

const ListTitle: React.FC<IListTitle> = ({
  uuid,
  title,
  created_by,
  is_deleted,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "item-details",
          params: {
            itemUuid: uuid,
          },
        })
      }
    >
      <View className="flex justify-center ml-3 gap-y-1 w-11/12">
        <Text className="font-psemibold text-sm text-white" numberOfLines={2}>
          {title} {is_deleted ? "(deleted)" : ""}
        </Text>
        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
          {created_by}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListTitle;
