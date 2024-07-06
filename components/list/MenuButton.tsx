import {
  View,
  Image,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import PopoverShortContent from "./PopoverShortContent";
import { IMenuButtonProps } from "@/types/list";

const MenuButton: React.FC<IMenuButtonProps> = ({
  onPress,
  icon,
  uuid,
  geo,
}) => {
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

  return (
    <View className="pt-2">
      <TouchableOpacity
        onPress={handleMenuPress}
        ref={menuButtonRef}
        className="p-4 -m-4"
      >
        <Image
          source={icon}
          className="w-5 h-5"
          resizeMode="contain"
          tintColor="#FF9C01"
        />
      </TouchableOpacity>
      <Popover
        isVisible={popoverVisible}
        from={menuButtonRef}
        onRequestClose={handleClosePopover}
        placement={PopoverPlacement.TOP}
        offset={30}
      >
        <PopoverShortContent
          uuid={uuid}
          geo={geo}
          setPopoverVisible={setPopoverVisible}
        />
      </Popover>
    </View>
  );
};

export default MenuButton;
