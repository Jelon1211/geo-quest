import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  GestureResponderEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { icons, images } from "@/constants";
import useItems from "@/hooks/useItems";
import { formatDate } from "@/lib/dateUtils";
import { openGoogleMaps } from "@/lib/geoUtils";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import PopoverContent from "@/components/popover/PopoverContent";
import { shortItems } from "@/components/popover/popoverItems";

interface IItemDetails {
  onPress?: (event: GestureResponderEvent) => void;
}

const ItemDetails: React.FC<IItemDetails> = ({ onPress }) => {
  const { itemUuid } = useLocalSearchParams();
  const { item, loading, error, fetchItemById } = useItems();
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const menuButtonRef = useRef(null);

  const handleMenuPress = (event: GestureResponderEvent) => {
    setPopoverVisible(true);
    if (onPress) {
      onPress(event);
    }
  };

  const handleClosePopover = () => {
    setPopoverVisible(false);
  };

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
            <TouchableOpacity
              className="absolute right-1 top-5 w-12 h-12"
              onPress={handleMenuPress}
              ref={menuButtonRef}
            >
              <Image
                source={icons.menu}
                className="w-6 h-6"
                resizeMode="contain"
                tintColor="#000"
              />
            </TouchableOpacity>
          </View>
          <Popover
            isVisible={popoverVisible}
            from={menuButtonRef}
            onRequestClose={handleClosePopover}
            placement={PopoverPlacement.BOTTOM}
            offset={30}
          >
            <PopoverContent
              uuid={item.uuid}
              geo={""}
              setPopoverVisible={setPopoverVisible}
              items={shortItems}
            />
          </Popover>

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
