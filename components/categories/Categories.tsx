import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import CategoryItem from "./CategoryItem";
import { CategoriesProps, ViewToken } from "@/types/categories";

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const [activeItem, setActiveItem] = useState<string | null>(
    categories.length > 0 ? categories[0].id : null
  );

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].key) {
      setActiveItem(viewableItems[0].key);
    }
  };

  if (!categories || categories.length === 0) {
    return <Text>No categories available</Text>;
  }

  return (
    <View className="w-full flex-1 pt-8 pb-8">
      <Text className="text-lg font-pregular text-gray-100 mb-3">
        Categories
      </Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryItem activeItem={activeItem || ""} item={item} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentInset={{ left: 170, right: 170 }}
      />
    </View>
  );
};

export default Categories;
