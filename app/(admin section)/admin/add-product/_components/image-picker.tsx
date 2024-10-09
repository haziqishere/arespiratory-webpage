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
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  No Images Selected
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

      <label htmlFor={name}>{label}</label>
      <div className="flex flex-col items-start gap-6 mb-4">
        <div className="flex flex-wrap gap-4">
          {pickedImages.length === 0 && (
            <p className="m-0 p-4">No images picked yet</p>
          )}
          {pickedImages.map((image, index) => (
            <div
              key={index}
              className="w-40 h-40 relative border-2 border-gray-400"
            >
              <Image
                src={image}
                alt={`Picked image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
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
