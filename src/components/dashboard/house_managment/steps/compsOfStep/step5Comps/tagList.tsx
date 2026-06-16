"use client";

interface TagListProps {
  label?: string;
  tags: string[] | undefined;
  activeTag?: string;
  onSelect?: (tag: string) => void;
}

export default function TagList({
  label = "برچسب ها :",
  tags,
  activeTag,
  onSelect,
}: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex items-center gap-3 flex-wrap mt-2 mb-4" dir="rtl">
      {label && (
        <span className="text-sm text-zinc-500 shrink-0">{label}</span>
      )}
      {tags.map((tag) => {
        const isActive = tag === activeTag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onSelect?.(tag)}
            className={`
              px-5 py-2 rounded-2xl text-sm font-medium transition-all
              ${isActive
                ? "bg-[#8CFF45] text-zinc-800 ring-2 ring-offset-1 ring-zinc-800"
                : "bg-[#8CFF45] text-zinc-800 hover:brightness-105"
              }
            `}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}