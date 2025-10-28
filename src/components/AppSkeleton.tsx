import React from "react";

export default function AppSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-500 animate-pulse">
      <div className="w-32 h-4 bg-gray-200 rounded mb-2" />
      <div className="w-48 h-4 bg-gray-200 rounded mb-2" />
      <div className="w-24 h-4 bg-gray-200 rounded" />
    </div>
  );
}

