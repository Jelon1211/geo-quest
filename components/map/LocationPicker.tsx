import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { extractCoordinates } from "@/lib/geoUtils";
import { ILocationPicker } from "@/types/map";

const LocationPicker: React.FC<ILocationPicker> = ({
  location,
  setLocation,
}) => {
  const handleMapPress = (event: MapPressEvent) => {
    const coords = extractCoordinates(event);
    setLocation(coords);
  };

  return (
    <View className="mt-7 space-y-2">
      <Text className="text-base text-gray-100 font-medium">
        Select Location
      </Text>
      <MapView
        style={{ width: "100%", height: 300 }}
        onPress={handleMapPress}
        showsUserLocation={true}
        showsBuildings={false}
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default LocationPicker;
