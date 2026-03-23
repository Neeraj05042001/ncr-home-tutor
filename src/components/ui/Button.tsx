"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp" | "outline-white";
type ButtonSize    = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  asChild?: boolean;
  href?: string;
}

// ─── Variant Styles ───────────────────────────────────────────────────────

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-saffron-400 text-navy-700 font-bold",
    "hover:bg-saffron-500 hover:shadow-saffron",
    "active:scale-[0.97]",
    "relative overflow-hidden"
  ),
  secondary: cn(
    "bg-navy-700 text-white font-semibold",
    "hover:bg-navy-600 hover:shadow-glow-navy",
    "active:scale-[0.97]"
  ),
  ghost: cn(
    "bg-transparent text-navy-700 font-semibold",
    "border-2 border-navy-700",
    "hover:bg-navy-700 hover:text-white",
    "active:scale-[0.97]"
  ),
  whatsapp: cn(
    "font-bold text-white",
    "hover:shadow-wa active:scale-[0.97]",
    "relative overflow-hidden"
  ),
  "outline-white": cn(
    "bg-transparent text-white font-semibold",
    "border-2 border-white/40",
    "hover:bg-white/10 hover:border-white/70",
    "active:scale-[0.97]"
  ),
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-sm rounded-full gap-1.5",
  md: "px-6 py-3 text-[15px] rounded-full gap-2",
  lg: "px-8 py-4 text-base rounded-full gap-2.5",
  xl: "px-10 py-[18px] text-[17px] rounded-full gap-3",
};

// ─── WhatsApp Icon ─────────────────────────────────────────────────────────

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.559 4.13 1.534 5.865L.054 23.946l6.26-1.451A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.032-1.388l-.36-.214-3.724.862.936-3.635-.234-.373A9.8 9.8 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
    </svg>
  );
}

export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z"/>
    </svg>
  );
}

// ─── Button ────────────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isWA = variant === "whatsapp";

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center",
          "font-body select-none",
          "transition-all duration-200 ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 focus-visible:ring-offset-2",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          isWA && "bg-whatsapp",
          className
        )}
        {...(props as any)}
      >
        {/* Shimmer overlay for primary button */}
        {variant === "primary" && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s linear infinite",
            }}
          />
        )}

        {/* WhatsApp ripple */}
        {isWA && (
          <span className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100">
            <span className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </span>
        )}

        {loading ? (
          <svg
            className="animate-spin"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="31.416"
              strokeDashoffset="10"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            <span className="relative z-10">{children}</span>
            {icon && iconPosition === "right" && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };