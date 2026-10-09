export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
export type ButtonSize = "md" | "sm" | "icon";
/** The surface the button sits on; drives ring-offset color and the secondary fill. */
export type ButtonSurface = "base" | "elevated";

export type ButtonClassesOptions = {
  variant: ButtonVariant;
  size: ButtonSize;
  surface?: ButtonSurface;
  /**
   * Layout-only classes appended last (e.g. `shrink-0`, `mt-4`, `group`).
   * There is no tailwind-merge: string order does not decide conflicts, the
   * stylesheet order does. Never pass unprefixed utilities that clash with the
   * helper's own display, height, padding, radius, color or typography; a
   * responsive override such as `md:hidden` is fine.
   */
  className?: string;
};

// transform is listed so `active:scale` eases instead of snapping; the global
// prefers-reduced-motion rule in globals.css also collapses these durations.
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold " +
  "transition-[color,background-color,border-color,opacity,transform] duration-150 ease-smooth " +
  "active:scale-[0.97] motion-reduce:transition-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const SIZES: Record<ButtonSize, string> = {
  md: "h-11 px-5",
  sm: "h-9 px-3",
  icon: "h-9 w-9",
};

const RING_OFFSET: Record<ButtonSurface, string> = {
  base: "focus-visible:ring-offset-bg-base",
  elevated: "focus-visible:ring-offset-bg-elevated",
};

const SECONDARY_FILL: Record<ButtonSurface, string> = {
  base: "bg-bg-elevated hover:bg-bg-overlay",
  elevated: "bg-bg-overlay",
};

const variantClasses = (variant: ButtonVariant, surface: ButtonSurface) => {
  switch (variant) {
    case "primary":
      return "bg-fg text-bg-base shadow-xs hover:bg-brand-muted";
    case "secondary":
      return `border border-border ${SECONDARY_FILL[surface]} text-fg-muted hover:border-border-strong hover:text-fg`;
    case "ghost":
      return "text-fg-muted hover:text-fg";
    case "accent":
      // Background comes from the caller's inline `style` (per-project color).
      return "text-bg-base hover:opacity-90";
  }
};

export const buttonClasses = ({
  variant,
  size,
  surface = "base",
  className,
}: ButtonClassesOptions): string =>
  [BASE, SIZES[size], RING_OFFSET[surface], variantClasses(variant, surface), className]
    .filter(Boolean)
    .join(" ");
