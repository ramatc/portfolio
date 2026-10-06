import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Projects from "@/app/components/Projects";

// Renders the real project list, so these assertions cover the data in
// Projects.tsx rather than fixtures.
describe("Projects case-study links", () => {
  it.each(["/proyectos/coda", "/proyectos/vame"])(
    "links to the %s case study",
    (route) => {
      render(<Projects />);

      const hrefs = screen
        .getAllByRole("link", { name: /Ver caso de estudio/ })
        .map((link) => link.getAttribute("href"));

      expect(hrefs).toContain(route);
    },
  );
});
