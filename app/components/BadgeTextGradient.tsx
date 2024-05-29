const BadgeTextGradient = ({ title }: { title: string }) => {
  return (
    <span className="mr-1 inline-flex items-center justify-center rounded-full border border-gray-600 bg-gray-200 px-2 py-1 text-sm font-medium text-gray-950">
      <span className="font-mono">#{title}</span>
    </span>
  );
};

export default BadgeTextGradient;
