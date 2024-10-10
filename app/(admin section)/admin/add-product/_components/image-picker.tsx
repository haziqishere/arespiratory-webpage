"use client";
import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";

interface Props {
  label: string;
  name: string;
  onImagesChange: (images: string[]) => void;
}

const ImagePicker = ({ label, name, onImagesChange }: Props) => {
  const [pickedImages, setPickedImages] = useState<string[]>([]);
  const imageInput = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    const newImages: string[] = [];

    files.forEach((file, index) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        newImages[index] = fileReader.result as string;
        if (newImages.length === files.length && newImages.every(Boolean)) {
          setPickedImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];
            onImagesChange(updatedImages);
            return updatedImages;
          });
        }
      };
      fileReader.readAsDataURL(file);
    });
  }

  return (
    <div>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {pickedImages.length === 0 && (
            <div className="p-4 pt-0">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-12">
                  <div
                    className="flex flex-col items-center gap-3 text-center cursor-pointer"
                    onClick={handlePickClick}
                  >
                    <ImagePlus className="w-10 h-10 text-sky-900 mx-auto" />
                    <p className="text-gray-500">
                      Select your image here. Jpeg, png are allowed
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {pickedImages.map((image: string, index) => (
            <CarouselItem key={index} className="relative w-full aspect-square">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <Image
                      src={image}
                      alt={`Picked image ${index + 1}`}
                      height={300}
                      width={300}
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-4">
        <Input
          className="hidden"
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          multiple
          onChange={handleImageChange}
        />
        <Button onClick={handlePickClick}>Pick Images</Button>
      </div>
    </div>
  );
};

export default ImagePicker;
