"use client";
import { Wifi, RefreshCw } from 'lucide-react';

interface NetworkErrorProps {
  onRetry?: () => void;
  message?: string;
}

const NetworkError = ({ onRetry, message }: NetworkErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-gray-400 mb-4">
        <Wifi className="w-16 h-16" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Internetga ulanishda xatolik
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-sm">
        {message || 'Internet aloqasini tekshiring va qaytadan urinib ko\'ring.'}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Qaytadan urinish
        </button>
      )}
    </div>
  );
};

export default NetworkError;
