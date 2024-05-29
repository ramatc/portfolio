import { cookies } from "next/headers";

const IntroPage = () => {
  const visitor = cookies().get("visitor")?.value;

  return (
    <span className="inline-flex items-center justify-center rounded-full border border-[white] border-opacity-50 bg-gray-950 px-3 py-1 font-medium text-gray-300 backdrop-blur-3xl">
      <span className="bg-gradient-to-t from-[#fff] to-[#8678f9] bg-clip-text text-base text-transparent md:text-xl lg:text-2xl">
        {!visitor ? (
          "Hola! Soy"
        ) : (
          <>
            Hola <span className="font-bold">{visitor}</span>! Soy
          </>
        )}
      </span>
    </span>
  );
};

export default IntroPage;
