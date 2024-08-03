import * as ImagePicker from "expo-image-picker";

export const openPicker = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    selectionLimit: 5,
    aspect: [4, 3],
    quality: 0.5,
  });

  if (!result.canceled) {
    return result.assets;
  } else {
    return [];
  }
};
