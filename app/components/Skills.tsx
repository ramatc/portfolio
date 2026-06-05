"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import Section from "@/app/components/Section";

interface Skill {
  name: string;
  img: string;
}

interface Category {
  label: string;
  items: Skill[];
}

const CATEGORIES: Category[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", img: "react" },
      { name: "Next.js", img: "nextjs" },
      { name: "TypeScript", img: "typescript" },
      { name: "JavaScript", img: "javascript" },
      { name: "HTML", img: "html5" },
      { name: "CSS", img: "css" },
      { name: "Tailwind", img: "tailwindcss" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", img: "nodejs" },
      { name: "Express", img: "expressjs" },
      { name: "Nest.js", img: "nestjs" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MySQL", img: "mysql" },
      { name: "Sequelize", img: "sequelize" },
      { name: "Firebase", img: "firebase" },
    ],
  },
  {
    label: "Testing",
    items: [{ name: "Jest", img: "jest" }],
  },
  {
    label: "Tooling",
    items: [{ name: "Git", img: "git" }],
  },
];

const Skills = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="habilidades" number="03" title="Habilidades">
      <ul className="flex flex-col gap-y-6">
        {CATEGORIES.map((category, i) => (
          <motion.li
            key={category.label}
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.45,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
            className="grid grid-cols-1 gap-4 md:grid-cols-[140px_1fr] md:items-center md:gap-8"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
              {category.label}
            </span>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <li
                  key={skill.name}
                  className="group inline-flex items-center gap-2 rounded-md border border-border-subtle bg-bg-elevated/60 px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-border hover:bg-bg-elevated hover:text-fg"
                >
                  <Image
                    src={`/skills/${skill.img}.svg`}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 shrink-0 opacity-90 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
};

export default Skills;
