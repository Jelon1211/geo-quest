import { ImageSourcePropType } from "react-native";

export interface Category {
  id: string;
  name: string;
  icon: ImageSourcePropType;
}

export interface CategoriesProps {
  categories: Category[];
}

export interface CategoryItemProps {
  activeItem: string;
  item: Category;
}

export interface ViewToken {
  key: string;
  isViewable: boolean;
  item: Category;
  index: number | null;
}

export interface ViewableItems {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
