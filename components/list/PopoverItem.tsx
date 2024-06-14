import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface IPopoverItem {
  key: number;
  label: string;
  onPress: () => void;
  isActive: boolean;
}

const PopoverItem = ({ label, isActive, onPress }: IPopoverItem) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="border-gray-300 border-b w-full flex justify-center items-center"
    >
      <Text className={`p-3 text-gray-600 ${isActive ? "" : "text-gray-100"}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PopoverItem;
