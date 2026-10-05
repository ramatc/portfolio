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
  image: string;
  /** CSS object-position for the preview crop. Defaults to "center". */
  imagePosition?: string;
  kind: "client" | "personal";
  description: string;
  highlights: string[];
  metrics?: ProjectMetric[];
  /** One-line takeaway about the skills or judgment the project shows. */
  proves: string;
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
