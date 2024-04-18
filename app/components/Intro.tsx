import { cookies } from "next/headers";

const IntroPage = () => {
  const visitor = cookies().get("visitor")?.value;

  return (
    <span className="border border-[white] border-opacity-50 inline-flex items-center justify-center rounded-full bg-gray-950 px-3 py-1 font-medium text-gray-300 backdrop-blur-3xl">
      <span className="bg-gradient-to-t from-[#fff] to-[#8678f9] bg-clip-text text-transparent text-base md:text-xl lg:text-2xl">
        {!visitor ? "Hola! Soy" : `Hola ${visitor}! Soy`}
      </span>
    </span>
  );
};

export default IntroPage;
