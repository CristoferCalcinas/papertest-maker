import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  maxSizeInMB?: number;
  acceptedFormats?: string[];
  width?: number;
  height?: number;
  aspectRatio?: number;
  className?: string;
  currentImage?: string;
}

export function ImageUpload({
  onUpload,
  maxSizeInMB = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
  width,
  height,
  aspectRatio,
  className = "",
  currentImage,
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage || null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = useCallback(
    (file: File): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        // Validar tamaño
        if (file.size > maxSizeInMB * 1024 * 1024) {
          reject(`La imagen no debe superar ${maxSizeInMB}MB`);
          return;
        }

        // Validar formato
        if (!acceptedFormats.includes(file.type)) {
          reject(
            `Formato no soportado. Formatos permitidos: ${acceptedFormats
              .map((f) => f.split("/")[1])
              .join(", ")}`
          );
          return;
        }

        // Validar dimensiones si se especificaron
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(img.src);

          if (width && img.width !== width) {
            reject(`El ancho debe ser ${width}px`);
            return;
          }

          if (height && img.height !== height) {
            reject(`El alto debe ser ${height}px`);
            return;
          }

          if (
            aspectRatio &&
            Math.abs(img.width / img.height - aspectRatio) > 0.01
          ) {
            reject(`La relación de aspecto debe ser ${aspectRatio}`);
            return;
          }

          resolve(true);
        };

        img.onerror = () => reject("Error al cargar la imagen");
      });
    },
    [maxSizeInMB, acceptedFormats, width, height, aspectRatio]
  );

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;

      setError(null);
      setLoading(true);

      try {
        await validateImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
          onUpload(reader.result as string);
          setLoading(false);
        };
        reader.onerror = () => {
          setError("Error al leer el archivo");
          setLoading(false);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError(err as string);
        setLoading(false);
      }
    },
    [validateImage, onUpload]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    setPreviewUrl(null);
    setError(null);
    onUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onUpload]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  useEffect(() => {
    if (currentImage) {
      setPreviewUrl(currentImage);
    }
  }, [currentImage]);

  return (
    <div className={`mt-2 ${className}`}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Vista previa"
            className="max-w-xs rounded shadow-sm hover:shadow-md transition-shadow"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }
            ${loading ? "opacity-50 cursor-wait" : ""}
          `}
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-1 text-sm text-gray-600">
            Haz clic o arrastra una imagen a esta área para subir
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {`Formatos permitidos: ${acceptedFormats
              .map((f) => f.split("/")[1])
              .join(", ")}`}
            <br />
            {`Tamaño máximo: ${maxSizeInMB}MB`}
            {(width || height) && <br />}
            {width && `Ancho requerido: ${width}px`}
            {height && ` • Alto requerido: ${height}px`}
            {aspectRatio && <br />}
            {aspectRatio &&
              `Relación de aspecto: ${aspectRatio.toFixed(2)} (${
                Math.round(aspectRatio * 100) / 100
              }:1)`}
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            disabled={loading}
          >
            Seleccionar imagen
          </Button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(",")}
        onChange={handleFileChange}
        className="hidden"
        disabled={loading}
      />
    </div>
  );
}

export default ImageUpload;
