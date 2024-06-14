import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { icons, images } from "@/constants";
import useItems from "@/hooks/useItems";
import { formatDate } from "@/lib/dateUtils";
import { openGoogleMaps } from "@/lib/geoUtils";

const ItemDetails = () => {
  const { itemUuid } = useLocalSearchParams();
  const { item, loading, error, fetchItemById } = useItems();

  useEffect(() => {
    if (typeof itemUuid === "string") {
      fetchItemById(itemUuid);
    }
  }, [itemUuid]);

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <Text className="text-red-500">Error fetching item details</Text>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView className="bg-primary h-full flex justify-center items-center">
        <Text className="text-gray-500">Item not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="w-full">
        <View className="w-full flex mt-12 mb-12">
          <View className="flex justify-center items-center">
            <Image
              source={images.thumbnail}
              className="rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex flex-row justify-between items-center px-4 py-2">
            <View className="flex flex-row gap-2">
              <Image
                source={icons.profile}
                className="rounded-lg w-6 h-6"
                resizeMode="cover"
              />
              <Text className="font-pregular text-gray-100 text-left">
                Owner Name
              </Text>
            </View>
            <View className="flex flex-row gap-2">
              <Image
                source={icons.time}
                className="rounded-lg w-5 h-5"
                resizeMode="cover"
                tintColor="#9ca3af"
              />
              <Text className="font-pregular text-gray-100 text-left">
                {formatDate(item.created_at)}
              </Text>
            </View>
          </View>

          <View className="flex flex-row justify-start items-center px-4 py-2">
            <View className="flex flex-row gap-2 pr-5">
              <Image
                source={icons.status}
                className="rounded-lg w-5 h-5"
                resizeMode="cover"
                tintColor="#9ca3af"
              />
              <Text className="font-pregular text-gray-100 text-left">
                {item.status}
              </Text>
            </View>
            <View className="flex flex-row gap-2 pr-5">
              <Image
                source={item.level === "active" ? icons.active : icons.inactive}
                className="rounded-lg w-5 h-5"
                resizeMode="cover"
                tintColor="#9ca3af"
              />
              <Text className="font-pregular text-gray-100 text-left">
                {item.level}
              </Text>
            </View>
            <View className="flex flex-row gap-2 pr-5">
              <Image
                source={icons.type}
                className="rounded-lg w-5 h-5"
                resizeMode="cover"
                tintColor="#9ca3af"
              />
              <Text className="font-pregular text-gray-100 text-left">
                {item.item_type}
              </Text>
            </View>
            <View className="flex flex-row gap-2 pr-5 ml-auto">
              <TouchableOpacity onPress={() => openGoogleMaps(item.geo)}>
                <Image
                  source={icons.map}
                  className="w-7 h-7"
                  tintColor="#FF9C01"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex flex-row justify-center items-center px-5 pt-6">
            <Text className="text-3xl font-semibold text-gray-200 text-left">
              {item.title}
            </Text>
          </View>

          <View className="mt-6 w-full px-4">
            <Text className="text-lg text-gray-300 text-justify">
              {item.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemDetails;
