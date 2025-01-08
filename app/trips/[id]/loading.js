import React from 'react'

const SkeletonDetailPage = () => {
    return (
      <div className="p-6 space-y-6">
        {/* Header Section Skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div> {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-1/4"></div> {/* Date */}
          <div className="h-4 bg-gray-200 rounded w-1/3"></div> {/* Location */}
        </div>
  
        {/* Tags Skeleton */}
        <div className="flex space-x-4">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-28"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
  
        {/* Carousel Skeleton */}
        <div className="flex space-x-4">
          <div className="h-48 w-48 bg-gray-200 rounded"></div>
          <div className="h-48 w-48 bg-gray-200 rounded"></div>
          <div className="h-48 w-48 bg-gray-200 rounded"></div>
        </div>
  
        {/* Itinerary and Weather Tabs Skeleton */}
        <div className="flex justify-between">
          <div className="h-6 bg-gray-200 rounded w-32"></div> {/* Tab 1 */}
          <div className="h-6 bg-gray-200 rounded w-32"></div> {/* Tab 2 */}
        </div>
  
        {/* Itinerary Content Skeleton */}
        <div className="h-32 bg-gray-200 rounded"></div>
  
        {/* Price Section Skeleton */}
        <div className="flex justify-between items-center space-x-4">
          <div className="h-10 bg-gray-200 rounded w-32"></div> {/* Price */}
          <div className="h-8 bg-gray-200 rounded w-1/4"></div> {/* Button */}
        </div>
      </div>
    );
  };

export default function LoadingDetails() {
  return (
    <div>
        <SkeletonDetailPage/>
      
    </div>
  )
}
