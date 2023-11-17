const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center my-10 space-y-3">
      <h2 className="text-2xl md:text-4xl uppercase font-semibold bg-gradient-to-r from-[#FF0000]  to-[#990000] bg-clip-text text-transparent">
        {heading}
      </h2>
      <p className="md:text-xl text-gray-800">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;
