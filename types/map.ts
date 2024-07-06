import { GestureResponderEvent } from "react-native";
import { IItem } from "./itemservice";

export interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface ICurrentLocation {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export interface LocationMarkerProps {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
  onPress?: () => void;
}

export interface ILocationPicker {
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  setLocation: (location: {
    latitude: number | null;
    longitude: number | null;
  }) => void;
}

export interface MapProps {
  currentLocation: ICurrentLocation;
  items: IItem[];
}

export interface IMapModalProps {
  visible: boolean;
  onClose: () => void;
  marker: IItem | null;
  currentLocation: ICurrentLocation;
  onPress?: (event: GestureResponderEvent) => void;
}
