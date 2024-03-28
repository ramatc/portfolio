import Code from "@/app/ui/icons/Code";
import CardTilt from "@/app/components/CardTilt";

const SKILLS = [
  {
    title: "HTML5",
    img: "html5",
  },
  {
    title: "CSS3",
    img: "css",
  },
  {
    title: "JavaScript",
    img: "javascript",
  },
  {
    title: "React.js",
    img: "react",
  },
  {
    title: "Next.js",
    img: "nextjs",
  },
  {
    title: "Node.js",
    img: "nodejs",
  },
  {
    title: "Express.js",
    img: "expressjs",
  },
  {
    title: "TypeScript",
    img: "typescript",
  },
  {
    title: "Tailwindcss",
    img: "tailwindcss",
  },
  {
    title: "Git",
    img: "git",
  },
  {
    title: "MySQL",
    img: "mysql",
  },
  {
    title: "Sequelize",
    img: "sequelize",
  },
  {
    title: "Firebase",
    img: "firebase",
  },
];

const Skills = () => {
  return (
    <section id="habilidades" data-section="habilidades">
      <h4>
        <Code />
        &nbsp;Habilidades
      </h4>
      <div className="grid grid-cols-5 gap-[20px]">
        {SKILLS.map((skill, i) => (
          <CardTilt key={i} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
