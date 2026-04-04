"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, FileText, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadFieldProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSizeMb?: number;
  error?: string;
  label?: string;
  hint?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

export function FileUploadField({
  value,
  onChange,
  accept = ".pdf,.jpg,.jpeg,.png,.webp",
  maxSizeMb = 10,
  error,
  label = "Upload File",
  hint,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file.size > maxSizeMb * 1024 * 1024) return;
      onChange(file);
    },
    [onChange, maxSizeMb]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      {!value ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 cursor-pointer transition-colors",
            dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30",
            error && "border-red-400"
          )}
        >
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {hint ?? `PDF, JPG, PNG, WebP — max ${maxSizeMb}MB`}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="sr-only"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
          {isImageFile(value) ? (
            <Image className="h-8 w-8 shrink-0 text-blue-500" />
          ) : (
            <FileText className="h-8 w-8 shrink-0 text-red-500" />
          )}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{value.name}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(value.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded-full p-1 hover:bg-muted transition-colors"
            aria-label="Remove file"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
