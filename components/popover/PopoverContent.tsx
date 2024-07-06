import { View, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import PopoverItem from "./PopoverItem";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { openGoogleMaps } from "@/lib/geoUtils";
import useItems from "@/hooks/useItems";
import Loading from "../Loading";
import { IMenuItems, PopoverContentProps } from "@/types/poporver";

const PopoverContent: React.FC<PopoverContentProps> = ({
  uuid,
  geo,
  setPopoverVisible,
  items,
}) => {
  const { user } = useGlobalContext();
  const [menuItems, setMenuItems] = useState<IMenuItems[]>([]);
  const { loading, deleteItem } = useItems();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setMenuItems(
        items.filter((item) => item.label !== "Edit" && item.label !== "Delete")
      );
    } else {
      setMenuItems(items);
    }
  }, [user, items]);

  const handlePress = async (action: any) => {
    switch (action) {
      case "Details":
        setPopoverVisible(false);
        router.push({
          pathname: "item-details",
          params: {
            itemUuid: uuid,
          },
        });
        break;
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
      default:
        throw new Error("no action handled");
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

export default PopoverContent;
