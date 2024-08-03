import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useLocation from "@/hooks/useLocation";
import { useFocusEffect } from "@react-navigation/native";
import PermissionMessage from "@/components/PermissionMessage";
import Map from "@/components/map/Map";
import Loading from "@/components/Loading";
import useItems from "@/hooks/useItems";
import * as Location from "expo-location";

const Play = () => {
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);
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

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(status === "granted");
    };

    checkPermissions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (hasLocationPermission) {
        if (!currentLocation) {
          getLocation();
        }
      }
    }, [currentLocation, hasLocationPermission])
  );

  if (hasLocationPermission === null) {
    return <Loading />;
  }

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
      {hasLocationPermission === false && (
        <PermissionMessage
          permissionDenied={permissionDenied}
          errorMessage={errorMessage}
        />
      )}
    </View>
  );
};

export default Play;
