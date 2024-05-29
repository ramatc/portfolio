"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import ButtonProject from "@/app/components/ButtonProject";
import BadgeTextGradient from "@/app/components/BadgeTextGradient";
import ExternalLink from "@/app/ui/icons/ExternalLink";
import Repo from "@/app/ui/icons/Repo";
import { Project } from "@/app/lib/definitions";

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
      className="relative mb-8 w-full justify-between overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-r from-black to-gray-950 shadow-2xl lg:mb-0 lg:flex lg:h-[300px]"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
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
          className="w-full object-cover sm:h-[300px] lg:h-full lg:w-[revert-layer] lg:object-fill"
        />
      </a>
      <div className="p-4 lg:w-[75%] xl:w-[57%] xl:px-2 xl:py-0">
        <h5 className={`font-bold xl:pt-6 ${color}`}>{title}</h5>
        <p className="mb-5 text-gray-200 md:text-[18px]">{description}</p>
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
