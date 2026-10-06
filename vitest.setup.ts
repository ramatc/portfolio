import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

// framer-motion's whileInView/useInView rely on IntersectionObserver,
// which jsdom does not implement.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (!("IntersectionObserver" in globalThis)) {
  globalThis.IntersectionObserver = IntersectionObserverStub;
}

// Chat scrolls its message list on every update; jsdom has no scrollTo
// on elements.
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}
