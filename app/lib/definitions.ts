export type FormData = {
  name: string;
  email: string;
  message: string;
};

export interface Project {
  title: string;
  url: string;
  repo: string;
  image: string;
  description: string;
  highlights: string[];
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
