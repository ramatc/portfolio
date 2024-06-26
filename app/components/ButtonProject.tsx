import { useRef, useState } from "react";

const ButtonProject = ({
  title,
  url,
  icon,
}: {
  title: string;
  url: string;
  icon?: any;
}) => {
  const divRef = useRef<HTMLAnchorElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <a
      ref={divRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex h-12 w-[48%] items-center justify-center overflow-hidden rounded-md border border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950 px-6 font-medium text-gray-300 shadow-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 lg:mr-3 lg:w-auto"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.1), #0000000f)`,
        }}
      />
      {icon}
      <p className="pl-1 text-sm md:text-base">{title}</p>
    </a>
  );
};

export default ButtonProject;
