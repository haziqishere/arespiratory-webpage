"use client";

import React from "react";
import Image from "next/image";

import { Progress } from "@/components/ui/progress";

type LoadingProps = {
  imageUrl: string;
  fileName: string;
  progress: number;
};

export const ImageLoading = ({
  imageUrl,
  fileName,
  progress,
}: LoadingProps) => {
  return (
    <div className="flex items-center p-2 border rounded-xl my-3">
      <Image
        src={imageUrl}
        alt={fileName}
        className="w-16 h-16 object-cover mr-4"
        width={64}
        height={64}
      />
      <div className="flex-1">
        <div className="text-sm font-medium">{fileName}</div>
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
};

export default ImageLoading;
