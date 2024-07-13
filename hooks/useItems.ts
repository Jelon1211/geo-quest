import { useState, useEffect } from "react";
import ItemsService from "@/services/itemsService";
import { ICreateItem, IItem, IUpdateItem } from "@/types/itemservice";
import { useGlobalContext } from "@/context/GlobalProvider";

const itemsService = new ItemsService({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_CITI || "",
  appToken: "Bearer xxx",
});

const useItems = (initialFetch = false) => {
  const { accessToken } = useGlobalContext();
  const [items, setItems] = useState<IItem[]>([]);
  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState<boolean>(initialFetch);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (accessToken) {
      itemsService.setAuthorizationToken(accessToken);
    }
    if (initialFetch) {
      fetchItems(0);
    }
  }, [accessToken, initialFetch]);

  const fetchItems = async (pageNumber: number = 0) => {
    setLoading(true);
    try {
      const limit = 10;
      const skip = pageNumber * limit;
      const data = await itemsService.getItems(skip, limit, -1, "created_at");
      if (pageNumber === 0) {
        setItems(data.data);
      } else {
        setItems((prevItems) => [...prevItems, ...data.data]);
      }
      setHasMore(data.data.length > 0);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const refreshItems = async () => {
    setPage(0);
    await fetchItems(0);
  };

  const fetchMoreItems = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchItems(nextPage);
        return nextPage;
      });
    }
  };

  const fetchItemById = async (itemUuid: string) => {
    setLoading(true);
    try {
      const data = await itemsService.getItemById(itemUuid);
      setItem(data.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: ICreateItem): Promise<IItem | void> => {
    setLoading(true);
    try {
      const data = await itemsService.createItem(itemData);
      setItem(data.data);
      return data.data;
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemUuid: string, itemData: IUpdateItem) => {
    setLoading(true);
    try {
      const data = await itemsService.updateItem(itemUuid, itemData);
      setItems((prevItems) =>
        prevItems.map((item) => (item.uuid === itemUuid ? data.data : item))
      );
      return data.data;
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (itemUuid: string): Promise<boolean> => {
    setLoading(true);
    try {
      await itemsService.deleteItem(itemUuid);
      setItems((prevItems) =>
        prevItems.filter((item) => item.uuid !== itemUuid)
      );
      return true;
    } catch (error) {
      setError(error as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    item,
    loading,
    error,
    fetchItems,
    refreshItems,
    fetchMoreItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useItems;
