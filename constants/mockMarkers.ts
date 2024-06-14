import { ICurrentLocation } from "@/types/map";

const baseLatitude = 50.104411;
const baseLongitude = 18.972282;

const generateRandomMarkers = (count: number): ICurrentLocation[] => {
  const markers: ICurrentLocation[] = [];
  for (let i = 0; i < count; i++) {
    const randomDistance = Math.random() * 1000; // Distance in meters
    const randomAngle = Math.random() * 2 * Math.PI;

    const latitudeOffset = (randomDistance / 111320) * Math.cos(randomAngle); // 1 degree latitude ~ 111.32 km
    const longitudeOffset =
      (randomDistance / (111320 * Math.cos(baseLatitude * (Math.PI / 180)))) *
      Math.sin(randomAngle); // 1 degree longitude ~ 111.32 km * cos(latitude)

    markers.push({
      latitude: baseLatitude + latitudeOffset,
      longitude: baseLongitude + longitudeOffset,
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    });
  }
  return markers;
};

const mockMarkers = generateRandomMarkers(10);

export default mockMarkers;
