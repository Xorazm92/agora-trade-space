'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface KidsCardProps {
  title: string;
  description?: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  badge?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  ageGroup?: string;
  rating?: number;
  isNew?: boolean;
  isSale?: boolean;
}

const KidsCard: React.FC<KidsCardProps> = ({
  title,
  description,
  image,
  price,
  originalPrice,
  badge,
  onClick,
  className = '',
  children,
  ageGroup,
  rating,
  isNew = false,
  isSale = false,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      className={`bg-white rounded-3xl shadow-fun hover:shadow-kids transition-all duration-300 overflow-hidden cursor-pointer relative ${className}`}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Badge */}
      {(isNew || isSale || badge) && (
        <div className="absolute top-3 left-3 z-10">
          {isNew && (
            <span className="bg-gradient-to-r from-kids-green to-kids-lime text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              YANGI
            </span>
          )}
          {isSale && (
            <span className="bg-gradient-to-r from-kids-red to-kids-coral text-white px-3 py-1 rounded-full text-xs font-bold animate-bounce">
              CHEGIRMA
            </span>
          )}
          {badge && (
            <span className="bg-gradient-to-r from-kids-purple to-kids-pink text-white px-3 py-1 rounded-full text-xs font-bold">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Age Group */}
      {ageGroup && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-kids-purple px-2 py-1 rounded-full text-xs font-bold border-2 border-kids-purple">
            {ageGroup}
          </span>
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="relative h-48 bg-gradient-to-br from-kids-pink/10 to-kids-purple/10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-display text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Rating */}
        {rating && (
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? 'text-kids-yellow' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating})</span>
          </div>
        )}

        {/* Price */}
        {price && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-kids-purple">
                {formatPrice(price)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            {originalPrice && originalPrice > price && (
              <span className="bg-kids-red text-white px-2 py-1 rounded-full text-xs font-bold">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </span>
            )}
          </div>
        )}

        {/* Custom Children */}
        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default KidsCard;
