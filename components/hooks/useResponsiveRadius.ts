"use client";
import { useEffect, useState } from "react";

export default function useResponsiveRadius() {
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setRadius(110);
      } else if (width >= 1024) {
        setRadius(100);
      } else if (width >= 768) {
        setRadius(90);
      }
    };

    updateRadius();

    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return radius;
}
