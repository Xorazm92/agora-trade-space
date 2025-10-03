"use client";
import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface PlaceholderImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackIcon?: React.ReactNode;
  fallbackText?: string;
}

const PlaceholderImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallbackIcon,
  fallbackText 
}: PlaceholderImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          {fallbackIcon || <ImageIcon className="w-8 h-8 mx-auto mb-2" />}
          {fallbackText && (
            <p className="text-xs text-gray-500">{fallbackText}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {imageLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse"
          style={{ width, height }}
        >
          <div className="text-gray-400">
            <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageLoading ? 'opacity-0' : 'opacity-100 transition-opacity'}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
      />
    </div>
  );
};

export default PlaceholderImage;
