import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { MapModalProps } from "@/types/map";
import { openGoogleMaps } from "@/lib/geoUtils";

const MapModal: React.FC<MapModalProps> = ({
  visible,
  onClose,
  marker,
  currentLocation,
}) => {
  if (!marker) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/25">
        <View className="w-10/12 px-3 pt-3 rounded-lg bg-white border-solid border-2 relative">
          <TouchableOpacity
            className="absolute -right-8 -top-8 z-50 w-16 h-16"
            onPress={onClose}
          >
            <Image
              source={icons.cancel}
              className="w-5 h-5 absolute right-6 top-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-center">{marker.title}</Text>
          <Image
            source={images.thumbnail}
            className="w-full max-w-72 max-h-52"
            resizeMode="contain"
          />
          <View className="w-100">
            <Text className="text-base">
              {/* 40 words max */}
              {marker.description}
            </Text>
            <View className="flex flex-row gap-7 pt-3 items-center justify-end">
              <Image
                source={icons.seeMore}
                className="w-6 h-6"
                tintColor="#FF9C01"
                resizeMode="contain"
              />
              <TouchableOpacity onPress={() => openGoogleMaps(marker.geo)}>
                <Image
                  source={icons.map}
                  className="w-8 h-8"
                  tintColor="#FF9C01"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Image
                source={icons.menu}
                className="w-8 h-8"
                tintColor="#FF9C01"
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MapModal;
