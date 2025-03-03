const CSeparator = ({ className }: { className?: string }) => {
  return (
    <div
      className={`px-6 flex justify-center items-center w-full ${className}`}
    >
      <hr className={`border-[2px] border-zip-blue2-500 rounded-2xl w-full`} />
    </div>
  );
};

export default CSeparator;
