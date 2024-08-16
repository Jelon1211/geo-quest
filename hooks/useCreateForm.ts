import { useState } from "react";
import { ICreateForm } from "@/types/formfield";
import { openPicker } from "@/lib/mobileUtils";
import { resizeImage } from "@/lib/imageUtils";

const useCreateForm = () => {
  const [createForm, setCreateForm] = useState<ICreateForm>({
    title: "",
    images: [],
    description: "",
    itemType: "book",
    location: { latitude: null, longitude: null },
  });
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleImagePick = async () => {
    setIsImageLoading(true);
    setCreateForm((prevCreateForm) => ({ ...prevCreateForm, images: [] }));
    const images = await openPicker();
    if (images.length > 0) {
      const resizedImages = await Promise.all(
        images.map(async (image) => {
          const resizedUri = await resizeImage(image.uri);
          return { ...image, uri: resizedUri };
        })
      );

      setCreateForm((prevCreateForm) => ({
        ...prevCreateForm,
        images: resizedImages,
      }));
    }
    setIsImageLoading(false);
  };

  const setLocation = (location: {
    latitude: number | null;
    longitude: number | null;
  }) => {
    setCreateForm((prevCreateForm) => ({ ...prevCreateForm, location }));
  };

  return {
    createForm,
    setCreateForm,
    handleImagePick,
    isImageLoading,
    setLocation,
  };
};

export default useCreateForm;
