import React from "react";
import * as Animatable from "react-native-animatable";
import { Image, TouchableOpacity, Text, View, ViewStyle } from "react-native";
import { CategoryItemProps } from "@/types/categories";

const zoomIn: any = {
  0: {
    scaleX: 0.9,
  },
  1: {
    scaleX: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const CategoryItem: React.FC<CategoryItemProps> = ({ activeItem, item }) => {
  return (
    <Animatable.View
      className="mr-4"
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={200}
    >
      <TouchableOpacity
        className="relative flex justify-center items-center pb-3"
        activeOpacity={0.7}
      >
        <View className="w-20 h-20 rounded-full bg-gray-200 justify-center items-center shadow-lg">
          <Image
            source={item.icon}
            className="w-14 h-14"
            resizeMode="contain"
          />
        </View>
        <Text className="text-center mt-2 text-lg font-semibold text-gray-100">
          {item.name}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default CategoryItem;
