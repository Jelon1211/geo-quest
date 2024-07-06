import { View, Text } from "react-native";
import React, { useCallback } from "react";
import useLocation from "@/hooks/useLocation";
import { useFocusEffect } from "@react-navigation/native";
import PermissionMessage from "@/components/PermissionMessage";
import Map from "@/components/map/Map";
import Loading from "@/components/Loading";
import useItems from "@/hooks/useItems";

const Play = () => {
  const { permissionDenied, errorMessage, currentLocation, getLocation } =
    useLocation();
  const { items, loading, error } = useItems(true);

  // To prevent actions when NOT on 'play' page
  // useFocusEffect(
  //   useCallback(() => {
  //     startLocationUpdates();
  //     return () => {
  //       stopLocationUpdates();
  //     };
  //   }, [startLocationUpdates, stopLocationUpdates])
  // );

  useFocusEffect(
    useCallback(() => {
      // refresh if gps disabled
      const interval = setInterval(() => {
        if (!currentLocation) {
          getLocation();
        }
      }, 2000);

      return () => clearInterval(interval);
    }, [currentLocation])
  );

  return (
    <View className="flex-1 items-center justify-center bg-white">
      {loading ? (
        <Loading />
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : currentLocation ? (
        <Map currentLocation={currentLocation} items={items} />
      ) : (
        <Loading />
      )}
      <PermissionMessage
        permissionDenied={permissionDenied}
        errorMessage={errorMessage}
      />
    </View>
  );
};

export default Play;
