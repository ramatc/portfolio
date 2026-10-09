import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectShowcase from "@/app/components/ProjectShowcase";
import { Project } from "@/app/lib/definitions";

function buildProject(overrides: Partial<Project>): Project {
  return {
    title: "Fixture",
    url: "",
    repo: "",
    image: "fixture.png",
    tagline: "A fixture project",
    kind: "personal",
    description: "Fixture description.",
    highlights: ["First highlight"],
    proves: "It renders.",
    role: "Full Stack",
    stack: ["React"],
    year: "2026",
    accent: "#22c55e",
    ...overrides,
  };
}

// ProjectShowcase renders both the desktop selector and the mobile list, so
// every project detail (and its links) appears more than once in jsdom.
describe("ProjectShowcase links", () => {
  it("renders no demo or repo links when a project has neither url nor repo", () => {
    render(
      <ProjectShowcase projects={[buildProject({ title: "Offline" })]} />,
    );

    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(
      screen.queryAllByRole("link", { name: /Ver demo de Offline/ }),
    ).toHaveLength(0);
    expect(
      screen.queryAllByRole("link", { name: /Ver código de Offline/ }),
    ).toHaveLength(0);

    const previews = screen.getAllByRole("img", {
      name: "Captura 1 de 1 de Offline",
    });
    expect(previews.length).toBeGreaterThan(0);
    for (const preview of previews) {
      expect(preview.closest("a")).toBeNull();
    }
  });

  it("renders demo and repo links with their hrefs when a project has both", () => {
    render(
      <ProjectShowcase
        projects={[
          buildProject({
            title: "Online",
            url: "https://online.example.com",
            repo: "https://github.com/example/online",
          }),
        ]}
      />,
    );

    const demoLinks = screen.getAllByRole("link", {
      name: /^Ver demo de Online \(/,
    });
    const repoLinks = screen.getAllByRole("link", {
      name: "Ver código de Online en GitHub",
    });

    expect(demoLinks.length).toBeGreaterThan(0);
    expect(repoLinks.length).toBeGreaterThan(0);
    for (const link of demoLinks) {
      expect(link).toHaveAttribute("href", "https://online.example.com");
      expect(link).toHaveAttribute("target", "_blank");
    }
    for (const link of repoLinks) {
      expect(link).toHaveAttribute("href", "https://github.com/example/online");
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("renders only the demo link when a project has a url but no repo", () => {
    render(
      <ProjectShowcase
        projects={[
          buildProject({ title: "DemoOnly", url: "https://demo.example.com" }),
        ]}
      />,
    );

    const demoLinks = screen.getAllByRole("link", {
      name: /^Ver demo de DemoOnly \(/,
    });

    expect(demoLinks.length).toBeGreaterThan(0);
    for (const link of demoLinks) {
      expect(link).toHaveAttribute("href", "https://demo.example.com");
      expect(link).toHaveAttribute("target", "_blank");
    }
    expect(
      screen.queryAllByRole("link", { name: /Ver código de DemoOnly/ }),
    ).toHaveLength(0);
    expect(screen.getAllByRole("link")).toHaveLength(demoLinks.length);
  });

  it("renders only the repo link when a project has a repo but no url", () => {
    render(
      <ProjectShowcase
        projects={[
          buildProject({
            title: "RepoOnly",
            repo: "https://github.com/example/repo-only",
          }),
        ]}
      />,
    );

    const repoLinks = screen.getAllByRole("link", {
      name: "Ver código de RepoOnly en GitHub",
    });

    expect(repoLinks.length).toBeGreaterThan(0);
    for (const link of repoLinks) {
      expect(link).toHaveAttribute(
        "href",
        "https://github.com/example/repo-only",
      );
      expect(link).toHaveAttribute("target", "_blank");
    }
    expect(
      screen.queryAllByRole("link", { name: /Ver demo de RepoOnly/ }),
    ).toHaveLength(0);
    expect(screen.getAllByRole("link")).toHaveLength(repoLinks.length);
  });
});
