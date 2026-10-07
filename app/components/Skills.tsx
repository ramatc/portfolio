"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import Section from "@/app/components/Section";

interface Skill {
  name: string;
  /** Icon file name(s) in /public/skills; a list renders the icons side by side. */
  img: string | string[];
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
      { name: "React Native", img: "reactnative" },
      { name: "Next.js", img: "nextjs" },
      { name: "TypeScript", img: "typescript" },
      { name: "JavaScript", img: "javascript" },
      { name: "HTML & CSS", img: ["html5", "css"] },
      { name: "Tailwind", img: "tailwindcss" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", img: "nodejs" },
      { name: "Nest.js", img: "nestjs" },
      { name: "Express", img: "expressjs" },
      { name: "Microservicios", img: "microservices" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "PostgreSQL", img: "postgresql" },
      { name: "Oracle", img: "oracle" },
      { name: "MongoDB", img: "mongodb" },
      { name: "MySQL", img: "mysql" },
      { name: "Prisma", img: "prisma" },
    ],
  },
  {
    label: "Testing",
    items: [
      { name: "Jest", img: "jest" },
      { name: "Vitest", img: "vitest" },
    ],
  },
  {
    label: "Tooling",
    items: [
      { name: "Git", img: "git" },
      { name: "Docker", img: "docker" },
      { name: "CI/CD", img: "cicd" },
      { name: "Claude Code", img: "claude" },
    ],
  },
];

const Skills = () => {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="habilidades" number="03" title="Habilidades">
      <ul className="flex flex-col gap-y-9">
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
            className="grid grid-cols-1 gap-2.5 md:grid-cols-[140px_1fr] md:items-start md:gap-8"
          >
            {/* Box matches chip height so the label aligns with the first row when chips wrap */}
            <span className="md:flex md:h-[38px] md:items-center font-mono text-xs uppercase tracking-wider text-fg-subtle">
              {category.label}
            </span>
            <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {category.items.map((skill) => (
                <li
                  key={skill.name}
                  className="flex min-w-0 items-center gap-2 rounded-md border border-border-subtle bg-bg-elevated/60 px-3 py-2 sm:px-3.5 text-sm text-fg-muted"
                >
                  <span className="flex shrink-0 gap-1">
                    {[skill.img].flat().map((img) => (
                      <Image
                        key={img}
                        src={`/skills/${img}.svg`}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  <span className="min-w-0 break-words">{skill.name}</span>
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
