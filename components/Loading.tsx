import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#FF9C01" />
    </View>
  );
};

export default Loading;
