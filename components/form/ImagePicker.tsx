import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { icons } from "../../constants";
import Loading from "@/components/Loading";
import { IImagePicker } from "@/types/imagepicker";

const ImagePicker = ({
  images,
  isImageLoading,
  handleImagePick,
}: IImagePicker) => {
  return (
    <View className="mt-7 space-y-2">
      <View
        className={
          images.length > 0
            ? "flex flex-row w-100 justify-between items-center"
            : ""
        }
      >
        <Text className="text-base text-gray-100 font-medium">
          Upload Images
        </Text>

        <TouchableOpacity onPress={handleImagePick}>
          <View
            className={`mt-3 bg-gray-800 rounded-2xl border border-gray-600 flex justify-center items-center ${
              images.length > 0 ? "w-10 h-10" : "w-full h-40"
            }`}
          >
            <View
              className={`border border-dashed border-secondary-100 flex justify-center items-center
                ${images.length > 0 ? "w-6 h-6" : "w-10 h-10"}
              `}
            >
              <Image
                source={icons.upload}
                resizeMode="contain"
                className="w-1/2 h-1/2"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {isImageLoading ? (
        <View>
          <Loading />
        </View>
      ) : null}
      {images.length > 0 && (
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              resizeMode="cover"
              className="w-64 h-64 rounded-2xl mx-2"
            />
          )}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      )}
    </View>
  );
};

export default ImagePicker;
