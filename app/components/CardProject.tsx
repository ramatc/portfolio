"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import ButtonProject from "@/app/components/ButtonProject";
import BadgeTextGradient from "@/app/components/BadgeTextGradient";
import ExternalLink from "@/app/ui/icons/ExternalLink";
import Repo from "@/app/ui/icons/Repo";

interface Project {
  title: string;
  url: string;
  repo: string;
  image: string;
  description: string;
  color: string;
  technologies: string[];
}

const CardProject = ({ project }: { project: Project }) => {
  const { title, url, repo, image, description, color, technologies } = project;
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
      className="lg:flex mb-8 lg:mb-0 justify-between relative w-full overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-r from-black to-gray-950 shadow-2xl lg:h-[300px]"
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
          alt={`Proyecto - ${title}`}
          priority={false}
          className="h-full w-full object-cover lg:object-fill lg:w-[revert-layer]"
        />
      </a>
      <div className="lg:w-[75%] xl:w-[57%] p-4 xl:py-0 xl:px-2">
        <h5 className={`font-bold xl:pt-6 ${color}`}>{title}</h5>
        <p className="text-gray-200 mb-5 md:text-[18px]">{description}</p>
        <div className="flex flex-wrap justify-between lg:block">
          <ButtonProject title="demo" url={url} icon={<ExternalLink />} />
          <ButtonProject title="code" url={repo} icon={<Repo />} />
        </div>
        <div className="mt-6">
          {technologies.map((technologie, i) => (
            <BadgeTextGradient title={technologie} key={i} />
          ))}
        </div>
      </div>
    </article>
  );
};

export default CardProject;
