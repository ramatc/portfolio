import { describe, expect, it } from "vitest";
import { buttonClasses } from "../button";

const tokens = (value: string) => value.split(/\s+/).filter(Boolean);

describe("buttonClasses", () => {
  it("applies the shared base to every variant", () => {
    const classes = tokens(buttonClasses({ variant: "ghost", size: "sm" }));
    for (const shared of [
      "inline-flex",
      "rounded-md",
      "text-sm",
      "font-semibold",
      "active:scale-[0.97]",
      "focus-visible:ring-2",
      "focus-visible:ring-brand/60",
      "focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed",
      "disabled:opacity-60",
    ]) {
      expect(classes).toContain(shared);
    }
  });

  it.each([
    ["md", ["h-11", "px-5"]],
    ["sm", ["h-9", "px-3"]],
    ["icon", ["h-9", "w-9"]],
  ] as const)("maps size %s to its height and padding", (size, expected) => {
    const classes = tokens(buttonClasses({ variant: "primary", size }));
    for (const cls of expected) expect(classes).toContain(cls);
  });

  it("uses the base surface by default", () => {
    const classes = tokens(buttonClasses({ variant: "secondary", size: "md" }));
    expect(classes).toContain("focus-visible:ring-offset-bg-base");
    expect(classes).toContain("bg-bg-elevated");
    expect(classes).not.toContain("bg-bg-overlay");
  });

  it("lifts secondary buttons one step on elevated surfaces", () => {
    const classes = tokens(
      buttonClasses({ variant: "secondary", size: "sm", surface: "elevated" }),
    );
    expect(classes).toContain("focus-visible:ring-offset-bg-elevated");
    expect(classes).toContain("bg-bg-overlay");
    expect(classes).not.toContain("bg-bg-elevated");
  });

  it("gives primary the inverted fill and brand hover", () => {
    const classes = tokens(buttonClasses({ variant: "primary", size: "md" }));
    expect(classes).toContain("bg-fg");
    expect(classes).toContain("text-bg-base");
    expect(classes).toContain("hover:bg-brand-muted");
  });

  it("leaves the accent background to the caller's inline style", () => {
    const classes = tokens(buttonClasses({ variant: "accent", size: "md" }));
    expect(classes.some((cls) => /^bg-/.test(cls))).toBe(false);
    expect(classes).toContain("hover:opacity-90");
  });

  it("appends the caller's layout classes after the helper classes", () => {
    const value = buttonClasses({
      variant: "ghost",
      size: "sm",
      className: "shrink-0 mt-4",
    });
    expect(value.endsWith("shrink-0 mt-4")).toBe(true);
    expect(tokens(value)).toContain("h-9");
  });
});
