// SkeletonCard.js
import React from 'react';

const SkeletonCard = () => (
  <div className="w-64 h-64 bg-gray-800 rounded-lg shadow-md animate-pulse">
    <div className="h-3/4 bg-gray-700 rounded-t-lg"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-700 rounded"></div>
    </div>
  </div>
);

export default SkeletonCard;
