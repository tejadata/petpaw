"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ImagePlus, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageItem {
  url: string;
  path: string;
  file?: File;
}

interface MultiImageUploadProps {
  images: ImageItem[];
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
  uploading?: boolean;
  uploadProgress?: number;
  maxImages?: number;
  disabled?: boolean;
}

export function MultiImageUpload({
  images,
  onAdd,
  onRemove,
  uploading = false,
  uploadProgress = 0,
  maxImages = 8,
  disabled = false,
}: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const remaining = maxImages - images.length;
    const files = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining);
    if (files.length > 0) onAdd(files);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-3">
      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img, idx) => (
            <div key={img.url + idx} className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <Image
                src={img.url}
                alt={`Image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="200px"
              />
              <button
                type="button"
                onClick={() => onRemove(idx)}
                disabled={disabled || uploading}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      {images.length < maxImages && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors
            ${dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}
            ${disabled || uploading ? "pointer-events-none opacity-50" : ""}
          `}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : (
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            {uploading ? "Uploading…" : "Click or drag images here"}
          </p>
          <p className="text-xs text-muted-foreground">
            {images.length}/{maxImages} images · JPG, PNG, WebP
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={disabled || uploading}
          />
        </div>
      )}

      {/* Progress bar */}
      {uploading && uploadProgress > 0 && (
        <Progress value={uploadProgress} className="h-2" />
      )}
    </div>
  );
}
