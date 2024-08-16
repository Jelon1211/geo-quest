import * as ImageManipulator from "expo-image-manipulator";

export const resizeImage = async (
  uri: string,
  width: number = 480,
  compress: number = 0.5
) => {
  try {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width } }],
      { compress, format: ImageManipulator.SaveFormat.JPEG }
    );

    return manipulatedImage.uri;
  } catch (error) {
    console.error("Error resizing image:", error);
    return uri;
  }
};
