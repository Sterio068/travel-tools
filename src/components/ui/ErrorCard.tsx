import type { ReactNode } from "react";

interface ErrorCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function ErrorCard({
  title,
  description,
  action,
  className = "",
}: ErrorCardProps) {
  return (
    <div
      role="alert"
      className={`rounded-[8px] border border-red-200 bg-red-50 px-5 py-4 text-red-950 ${className}`}
    >
      <h2 className="text-base font-extrabold">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-6 text-red-800">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

