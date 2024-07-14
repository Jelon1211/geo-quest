import AsyncStorage from "@react-native-async-storage/async-storage";

export class TokenStorage {
  static async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error saving item to AsyncStorage:", error);
      throw error;
    }
  }

  static async getItem(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Error retrieving item from AsyncStorage:", error);
      throw error;
    }
  }

  static async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
      throw error;
    }
  }
}
