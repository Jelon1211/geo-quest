import { View, StatusBar } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { MapProps } from "@/types/map";
import LocationMarker from "./LocationMarker";
import MapModal from "./MapModal";
import useModal from "@/hooks/useModal";
import { IItem } from "@/types/itemservice";
import { parseGeoCoordinates } from "@/lib/geoUtils";

const Map: React.FC<MapProps> = ({ currentLocation, items }) => {
  const { modalVisible, selectedMarker, handleMarkerPress, closeModal } =
    useModal();

  return (
    <View className="absolute w-full h-full">
      <StatusBar hidden={modalVisible} />

      <MapView
        className="absolute w-full h-full"
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation={true}
        customMapStyle={[
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ]}
        showsMyLocationButton={true}
        mapPadding={{ top: 40, right: 0, bottom: 0, left: 0 }}
      >
        {items &&
          items.map((item: IItem) => {
            const { uuid, title, geo } = item;
            const [latitude, longitude] = parseGeoCoordinates(geo);

            return (
              <LocationMarker
                key={uuid}
                latitude={latitude}
                longitude={longitude}
                title={title}
                onPress={() => {
                  handleMarkerPress(item);
                }}
              />
            );
          })}
      </MapView>

      <MapModal
        visible={modalVisible}
        onClose={closeModal}
        marker={selectedMarker}
        currentLocation={currentLocation}
      />
    </View>
  );
};

export default Map;
