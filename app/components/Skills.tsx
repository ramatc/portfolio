import Code from "@/app/ui/icons/Code";
import CardSkill from "@/app/components/CardSkill";

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
      <div className="flex flex-wrap justify-between gap-3 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 xl:gap-5">
        {SKILLS.map((skill, i) => (
          <CardSkill key={i} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
