import {
  GestureResponderEvent,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { Category } from "./categories";
import { RefObject } from "react";

export interface ListHeaderProps {
  categories: Category[];
}

export interface SearchInputProps {
  initialQuery?: string | null;
}

export interface IListProfileIcon {
  icon: ImageSourcePropType;
}

export interface IListTitle {
  uuid: string;
  title: string;
  created_by: string;
  is_deleted?: boolean;
}

export interface IListPicture {
  uuid: string;
  image: ImageSourcePropType;
}

export interface IListModal {
  modalVisible: boolean;
  handleCloseModal: () => void;
}

export interface IMenuButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  icon: ImageSourcePropType;
  uuid: string;
  geo: string;
}
