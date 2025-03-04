const HighlightEffect = ({ children }: { children: React.ReactNode }) => {
  // hover:shadow-[0_0_20px_rgba(48,158,181,0.7)]
  return (
    <span className="relative inline-block cursor-pointer font-bold text-xl transition-all duration-200 ease-in-out rounded-t-lg hover:text-zip-blue2-700 hover:bg-zip-blue2-100 px-4 py-2">
      {children}
    </span>
  );
};

export default HighlightEffect;
