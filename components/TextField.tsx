import { type InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function TextField({ label, hint, className = "", id, ...props }: TextFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-charcoal">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-3.5 text-charcoal placeholder:text-gray-400 outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/10 ${className}`}
        {...props}
      />
      {hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
