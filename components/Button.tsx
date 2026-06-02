"use client";

import Link from "next/link";
import {
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from "react";

type Variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest text-white hover:bg-forest-light active:scale-[0.98] disabled:bg-forest/50",
  secondary:
    "bg-white text-forest border-2 border-forest hover:bg-sage/40 active:scale-[0.98] disabled:opacity-50",
};

export function Button({
  variant = "primary",
  href,
  children,
  fullWidth = true,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-base font-semibold transition-all duration-200 ${fullWidth ? "w-full" : ""} ${variantClasses[variant]} ${className}`;

  if (href && !disabled) {
    const { onClick, type: _type } = props;
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
