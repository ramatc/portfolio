"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import ButtonAnimatedGradient from "@/app/components/ButtonAnimatedGradient ";

interface Project {
  title: string;
  url: string;
  repo: string;
  image: string;
  description: string;
}

const CardProject = ({ project }: { project: Project }) => {
  const { title, url, repo, image, description } = project;
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
      <a href={url} target="_blank">
        <Image
          src={`/projects/${image}`}
          width={450}
          height={450}
          alt={title}
          priority={false}
        />
      </a>
      <div className="w-[57%] px-2">
        <h5>{title}</h5>
        <p className="text-gray-300">{description}</p>
        <ButtonAnimatedGradient title="Repo" url={repo} />
        <ButtonAnimatedGradient title="Demo" url={url} />
      </div>
    </article>
  );
};

export default CardProject;