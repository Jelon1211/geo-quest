import { ImageSourcePropType } from "react-native";

export interface ITabIcon {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}
