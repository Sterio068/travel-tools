interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Tag({ label, selected = false, onClick }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
        selected
          ? "bg-brand-500 text-slate-50 shadow-sm"
          : "bg-[var(--color-surface-card)] text-brand-700 border border-brand-200 hover:border-brand-400 hover:text-brand-600"
      }`}
    >
      {label}
    </button>
  );
}
