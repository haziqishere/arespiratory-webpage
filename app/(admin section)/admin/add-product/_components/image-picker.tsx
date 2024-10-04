"use client";
import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  label: string;
  name: string;
}

const ImagePicker = ({ label, name }: Props) => {
  // Explicitly define state type for the picked image
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  // Define ref type for image input
  const imageInput = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    // Add a null check for the ref before accessing .current
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; // Optional chaining in case no file is selected

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result as string); // Type assertion for fileReader result
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className="flex item-start gap-6 mb-4">
        <div className="w-40 h-40 flex justify-center text-center items-center text-gray-500 relative border-2 border-gray-400">
          {!pickedImage && <p className="m-0 p-4">No image picked yet</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by user."
              fill
              className="object-cover"
            />
          )}
        </div>
        <Input
          className="hidden"
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <Button onClick={handlePickClick}>Pick an Image</Button>
      </div>
    </div>
  );
};

export default ImagePicker;
