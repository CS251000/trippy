import { Skeleton } from "@/components/ui/skeleton";


const SkeletonCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 rounded"></div>

      {/* Text Skeletons */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Additional Text Skeleton */}
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Price and Button Skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};

export default function Loading() {
    return (
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Render multiple skeleton cards */}
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />

     
    </div>
    );
  }
  