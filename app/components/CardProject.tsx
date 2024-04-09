"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import ButtonProject from "@/app/components/ButtonProject";
import ExternalLink from "@/app/ui/icons/ExternalLink";
import Repo from "@/app/ui/icons/Repo";
interface Project {
  title: string;
  url: string;
  repo: string;
  image: string;
  description: string;
  color: number;
}

const COLORS = ["#d3a6d4", "#ffd368", "#6b8e23"];

const CardProject = ({ project }: { project: Project }) => {
  const { title, url, repo, image, description, color } = project;
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <article
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex justify-between relative h-[300px] w-[100%] overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-r from-black to-gray-950 shadow-2xl"
    >
      <div
        className="absolute pointer-events-none -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 40%)`,
        }}
      />
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Image
          src={`/projects/${image}`}
          width={450}
          height={450}
          alt={title}
          priority={false}
        />
      </a>
      <div className="w-[57%] px-2">
        <h5 className={`font-bold text-[${COLORS[color]}]`}>{title}</h5>
        <p className="text-gray-300 mb-5 text-[18px]">{description}</p>
        <ButtonProject title="demo" url={url} icon={<ExternalLink />} />
        <ButtonProject title="code" url={repo} icon={<Repo />} />
      </div>
    </article>
  );
};

export default CardProject;
