import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export function Card({ children, className = "", padding = "md" }: CardProps) {
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  return (
    <div
      className={`bg-white rounded-[16px] shadow-[0_1px_3px_rgba(8,51,68,0.06),0_1px_2px_rgba(8,51,68,0.04)] ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
