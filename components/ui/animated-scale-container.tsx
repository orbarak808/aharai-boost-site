import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  show: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  children: React.ReactNode;
};

export const AnimatedScaleContainer = ({
  show,
  width = "auto",
  height = "auto",
  className,
  children
}: Props) => {
  return (
    <div
      style={{ width, height }}
      className={cn(
        "transition-all duration-500 ease-out transform",
        show
          ? "scale-100 opacity-100 pointer-events-auto"
          : "scale-75 opacity-0 pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
};
