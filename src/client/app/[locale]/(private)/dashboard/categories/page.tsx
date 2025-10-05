import React from "react";
import { Loader2 } from "lucide-react";

const CategoriesDashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Categories Dashboard</h1>
      <p className="text-gray-600">Dashboard is loading...</p>
      <p className="text-sm text-gray-500 mt-4">
        This feature will be available after deployment
      </p>
    </div>
  );
};

export default CategoriesDashboard;
