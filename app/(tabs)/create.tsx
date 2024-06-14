import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { icons } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { generateUUID } from "@/lib/uuidUtils";
import { openPicker } from "@/lib/mobileUtils";
import LocationPicker from "@/components/map/LocationPicker";
import { ICreateForm } from "@/types/formfield";
import { router } from "expo-router";
import useItems from "@/hooks/useItems";

const Create = () => {
  const [form, setForm] = useState<ICreateForm>({
    title: "",
    image: null as any,
    description: "",
    itemType: "book",
    location: {
      latitude: null as number | null,
      longitude: null as number | null,
    },
  });

  const { createItem, loading, error } = useItems();

  const handleImagePick = async () => {
    const image = await openPicker();
    if (image) {
      setForm({
        ...form,
        image: image,
      });
    }
  };

  const setLocation = (location: {
    latitude: number | null;
    longitude: number | null;
  }) => {
    setForm({ ...form, location });
  };

  const submit = async () => {
    if (
      !form.title ||
      !form.image ||
      !form.description ||
      !form.location.latitude ||
      !form.location.longitude
    ) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const itemData = {
      title: form.title,
      description: form.description,
      item_type: form.itemType,
      owner: generateUUID(),
      created_by: generateUUID(),
      lat: form.location.latitude,
      lon: form.location.longitude,
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
        setForm({
          title: "",
          image: null,
          description: "",
          itemType: "book",
          location: {
            latitude: null,
            longitude: null,
          },
        });
      }
    } catch (er) {
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
          value={form.title}
          placeholder="Give your game a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-medium">
            Upload Image
          </Text>

          <TouchableOpacity onPress={handleImagePick}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-gray-800 rounded-2xl border border-gray-600 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Description"
          value={form.description}
          placeholder="Description of your game..."
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
          multiline={true}
          numberOfLines={5}
        />
        <FormField
          title="Item Type"
          value={form.itemType}
          placeholder="Item Type of your game..."
          handleChangeText={(e) => setForm({ ...form, itemType: e })}
          otherStyles="mt-7"
        />

        <LocationPicker location={form.location} setLocation={setLocation} />

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
