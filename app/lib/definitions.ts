export type FormData = {
  name: string;
  email: string;
  message: string;
};

export interface Skill {
  title: string;
  img: string;
}

export interface Project {
  title: string;
  url: string;
  repo: string;
  image: string;
  description: string;
  color: string;
  technologies: string[];
}

export interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
}
