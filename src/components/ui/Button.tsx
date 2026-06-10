import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-[8px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";
  const variants = {
    primary:
      "bg-brand-500 text-slate-50 hover:bg-brand-600 active:bg-brand-700 shadow-sm",
    secondary:
      "bg-accent-500 text-slate-50 hover:bg-accent-600 active:bg-accent-700 shadow-sm",
    ghost:
      "bg-transparent text-brand-600 hover:bg-brand-50 border border-brand-200",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
