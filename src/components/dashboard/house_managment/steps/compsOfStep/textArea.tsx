"use client";

interface FormTextareaProps {
  name: string;
  label: string;
  defaultValue?: string;
  error?: string;
  placeholder?: string;
  rows?: number;
}

export default function FormTextarea({
  name,
  label,
  defaultValue = "",
  error,
  placeholder = "توضیحات ملک را وارد کنید...",
  rows = 4,
}: FormTextareaProps) {
  return (
    <div className="w-[95%] pr-2">
      <label className="text-[14px] font-medium block mb-3 pr-2">
        {label}
      </label>

      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full border rounded-lg p-2 text-sm text-gray-700
          resize-none                      
          hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-400
          ${error ? "border-red-400" : "border-gray-300"}
        `}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1 pr-2">{error}</p>
      )}
    </div>
  );
}