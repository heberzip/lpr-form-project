const CSeparator = ({ className = "mt-4 mb-6" }: { className?: string }) => {
  return (
    <div className={`flex w-full px-6  ${className}`}>
      <hr className={`border-[2px] border-zip-blue2-500 rounded-2xl w-full`} />
    </div>
  );
};

export default CSeparator;
