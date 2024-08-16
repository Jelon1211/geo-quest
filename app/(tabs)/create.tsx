import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, Alert } from "react-native";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import LocationPicker from "@/components/map/LocationPicker";
import useItems from "@/hooks/useItems";
import useCreateForm from "@/hooks/useCreateForm";
import ImagePicker from "@/components/form/ImagePicker";
import { generateUUID } from "@/lib/uuidUtils";
import { router } from "expo-router";

const Create = () => {
  const {
    createForm,
    setCreateForm,
    handleImagePick,
    isImageLoading,
    setLocation,
  } = useCreateForm();
  const { createItem, loading } = useItems();

  const submit = async () => {
    if (
      !createForm.title ||
      !createForm.images ||
      !createForm.description ||
      !createForm.location.latitude ||
      !createForm.location.longitude
    ) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const itemData = {
      title: createForm.title,
      description: createForm.description,
      item_type: createForm.itemType,
      owner: generateUUID(),
      created_by: generateUUID(),
      lat: createForm.location.latitude,
      lon: createForm.location.longitude,
    };

    try {
      const data = await createItem(itemData);
      if (data) {
        router.push({
          pathname: "item-details",
          params: {
            itemUuid: data.uuid,
          },
        });
        setCreateForm({
          title: "",
          images: null,
          description: "",
          itemType: "book",
          location: { latitude: null, longitude: null },
        });
      }
    } catch {
      Alert.alert("Error", "There was an error creating the item.");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-semibold">
          Create a New Game
        </Text>

        <FormField
          title="Game Title"
          value={createForm.title}
          placeholder="Give your game a catchy title..."
          handleChangeText={(e) => setCreateForm({ ...createForm, title: e })}
          otherStyles="mt-10"
        />

        <ImagePicker
          images={createForm.images}
          isImageLoading={isImageLoading}
          handleImagePick={handleImagePick}
        />

        <FormField
          title="Description"
          value={createForm.description}
          placeholder="Description of your game..."
          handleChangeText={(e) =>
            setCreateForm({ ...createForm, description: e })
          }
          otherStyles="mt-7"
          multiline
          numberOfLines={5}
        />

        <FormField
          title="Item Type"
          value={createForm.itemType}
          placeholder="Item Type of your game..."
          handleChangeText={(e) =>
            setCreateForm({ ...createForm, itemType: e })
          }
          otherStyles="mt-7"
        />

        <LocationPicker
          location={createForm.location}
          setLocation={setLocation}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
