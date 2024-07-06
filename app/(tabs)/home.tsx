import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl } from "react-native";

import useItems from "@/hooks/useItems";
import ListHeader from "@/components/list/ListHeader";
import EmptyState from "@/components/EmptyState";
import categories from "@/constants/categories";
import ListItem from "@/components/list/ListItem";
import Loading from "@/components/Loading";
import { useGlobalContext } from "@/context/GlobalProvider";

const Home: React.FC = () => {
  const { user } = useGlobalContext();
  const { items, loading, error, fetchMoreItems, refreshItems } =
    useItems(true);
  const [refreshing, setRefreshing] = useState(false);
  const [localCategories, setLocalCategories] = useState(categories);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshItems();
    setRefreshing(false);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <Loading />;
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={items}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => <ListItem item={item} />}
        ListHeaderComponent={() => <ListHeader categories={localCategories} />}
        ListEmptyComponent={EmptyState}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={fetchMoreItems}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default Home;
