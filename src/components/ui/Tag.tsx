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
      className={`inline-flex items-center px-4 py-1.5 rounded-[20px] text-sm font-medium transition-all ${
        selected
          ? "bg-brand-500 text-white shadow-sm"
          : "bg-white text-brand-700 border border-brand-200 hover:border-brand-400 hover:text-brand-600"
      }`}
    >
      {label}
    </button>
  );
}
