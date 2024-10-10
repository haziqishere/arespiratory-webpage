"use client";
import { useRef, useState, ChangeEvent, useEffect } from "react";
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

import { ImageLoading } from "@/components/imageLoading";

interface Props {
  label: string;
  name: string;
  onImagesChange: (images: string[]) => void;
}

const ImagePicker = ({ label, name, onImagesChange }: Props) => {
  const [pickedImages, setPickedImages] = useState<
    { url: string; fileName: string; progress: number }[]
  >([]);
  //const [pickedImages, setPickedImages] = useState<string[]>([]);
  const imageInput = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    const newImages: { url: string; fileName: string; progress: number }[] = [];

    files.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        newImages.push({
          url: fileReader.result as string,
          fileName: file.name,
          progress: 0,
        });
        if (newImages.length === files.length) {
          setPickedImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];
            onImagesChange(updatedImages.map((img) => img.url));
            return updatedImages;
          });
        }
      };
      fileReader.readAsDataURL(file);
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPickedImages((prevImages) =>
        prevImages.map((image) => ({
          ...image,
          progress: image.progress < 100 ? image.progress + 10 : 100,
        }))
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

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
          {pickedImages.map((image, index) => (
            <CarouselItem key={index} className="relative w-full aspect-square">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <Image
                      src={image.url}
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

      <div>
        {pickedImages.map((image, index) => (
          <ImageLoading
            key={index}
            imageUrl={image.url}
            fileName={image.fileName}
            progress={image.progress}
          />
        ))}
      </div>

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
