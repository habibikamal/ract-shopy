// app/shared/components/Loader.tsx
"use client";

import React from "react";

export default function Loading({
  size = 40,
  color = "#4F46E5",
}: {
  size?: number;
  color?: string;
}) {
  const borderSize = size / 8;

  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full"
        style={{
          width: size,
          height: size,
          borderWidth: borderSize,
          borderColor: `${color}30`,
          borderTopColor: color,
          borderStyle: "solid",
        }}
      ></div>
    </div>
  );
}


export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <Loading size={55} color="#4F46E5" />
    </div>
  );
}
