import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("lists each case study as an absolute URL without double slashes", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const route of ["/proyectos/coda", "/proyectos/vame"]) {
      const url = urls.find((candidate) => candidate.endsWith(route));

      expect(url).toBeDefined();
      expect(url).toMatch(/^https:\/\/[^/]+\/proyectos\/[a-z]+$/);
    }
  });

  it("ranks case studies below the home page", () => {
    const entries = sitemap();
    const home = entries.find((entry) =>
      /^https:\/\/[^/]+\/?$/.test(entry.url),
    );
    const caseStudies = entries.filter((entry) =>
      entry.url.includes("/proyectos/"),
    );

    expect(home?.priority).toBe(1);
    expect(caseStudies).not.toHaveLength(0);
    for (const entry of caseStudies) {
      expect(entry.priority).toBe(0.8);
    }
  });
});
