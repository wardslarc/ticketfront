import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface FileUploaderProps {
  onFileChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedFileTypes?: string;
}

const FileUploader = ({
  onFileChange = () => {},
  maxFiles = 5,
  maxSizeMB = 5,
  acceptedFileTypes = "*",
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;

      const newFiles: File[] = [];
      const fileArray = Array.from(selectedFiles);

      fileArray.forEach((file) => {
        // Check if we've reached the max number of files
        if (files.length + newFiles.length >= maxFiles) return;

        // Check file size
        if (file.size > maxSizeBytes) return;

        newFiles.push(file);
      });

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFileChange(updatedFiles);
    },
    [files, maxFiles, maxSizeBytes, onFileChange],
  );

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFileChange(e.dataTransfer.files);
    },
    [handleFileChange],
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      onFileChange(newFiles);
    },
    [files, onFileChange],
  );

  return (
    <div className="w-full bg-background border rounded-md p-4">
      <div
        className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center ${dragActive ? "border-primary bg-primary/5" : "border-muted"}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-1">
          Drag and drop files here, or
        </p>
        <div>
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Browse files
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              accept={acceptedFileTypes}
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </label>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Max {maxFiles} files, up to {maxSizeMB}MB each
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Attached files:</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-muted/30 rounded-md p-2 text-sm"
              >
                <div className="truncate max-w-[80%]">
                  <span className="font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
