const CSeparator = ({ className }: { className?: string }) => {
  return (
    <hr
      className={`border-[1px] border-zip-blue2-600 rounded-3xl mt-4 mb-6 shadow-lg ${className}`}
    />
  );
};

export default CSeparator;
