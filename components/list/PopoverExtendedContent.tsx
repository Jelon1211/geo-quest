import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { PopoverExtendedContentProps } from "@/types/list";
import PopoverItem from "./PopoverItem";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { openGoogleMaps } from "@/lib/geoUtils";
import useItems from "@/hooks/useItems";
import Loading from "../Loading";

interface IMenuItems {
  id: number;
  label: string;
  isActive: boolean;
}

const allItems = [
  { id: 2, label: "Navigate", isActive: true },
  { id: 3, label: "Edit", isActive: true },
  { id: 4, label: "Delete", isActive: true },
  { id: 5, label: "Report", isActive: false },
];

const PopoverExtendedContent: React.FC<PopoverExtendedContentProps> = ({
  uuid,
  geo,
  setPopoverVisible,
}) => {
  const { user } = useGlobalContext();
  const [menuItems, setMenuItems] = useState<IMenuItems[]>([]);
  const { loading, deleteItem } = useItems();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setMenuItems(
        allItems.filter(
          (item) => item.label !== "Edit" && item.label !== "Delete"
        )
      );
    } else {
      setMenuItems(allItems);
    }
  }, [user]);

  const handlePress = async (action: any) => {
    switch (action) {
      case "Edit":
        setPopoverVisible(false);
        router.push({
          pathname: "item-edit",
          params: {
            itemUuid: uuid,
          },
        });
        break;
      case "Delete":
        setIsDeleting(true);
        const success = await deleteItem(uuid);
        setIsDeleting(false);
        if (success) {
          Alert.alert("Udalo się!", "gra została usunięta");
        } else {
          Alert.alert("Error", "Nie udało się usunąć itemu");
        }
        setPopoverVisible(false);
        break;
      case "Navigate":
        openGoogleMaps(geo);
        break;
      case "Report":
        break;
        defualt: throw new Error("no action handled");
    }
  };

  return (
    <ScrollView className="w-full">
      <View className="flex rounded p-2 items-center w-28">
        {menuItems.map(
          (item: { id: number; label: string; isActive: boolean }) => (
            <PopoverItem
              key={item.id}
              label={item.label}
              onPress={() => handlePress(item.label)}
              isActive={item.isActive}
            />
          )
        )}
      </View>
      {isDeleting && (
        <View className="absolute bg-black/50 w-full h-full">
          <Loading />
        </View>
      )}
    </ScrollView>
  );
};

export default PopoverExtendedContent;
