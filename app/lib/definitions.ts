export type FormData = {
  name: string;
  email: string;
  message: string;
};

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  title: string;
  /** Live demo URL. Empty when the project has no public deployment. */
  url: string;
  repo: string;
  /** Thumbnail shown in the project selector. */
  image: string;
  /** Screenshots shown in the detail view. Falls back to `image` when empty. */
  gallery?: string[];
  /** Short summary shown under the title in the selector. */
  tagline: string;
  kind: "client" | "personal";
  inProgress?: boolean;
  description: string;
  highlights: string[];
  metrics?: ProjectMetric[];
  /** One-line takeaway about the skills or judgment the project shows. */
  proves: string;
  /** Internal href to the project's case-study page, when one exists. */
  caseStudy?: string;
  role: string;
  stack: string[];
  year: string;
  accent: string;
}

export interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
}
