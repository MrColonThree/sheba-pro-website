import { DotLoader } from "react-spinners";
import SectionTitle from "../../../Components/SectionTitle";
import useCategory from "../../../Hooks/useCategory";
import CardOurServices from "./CardOurServices";

const OurServices = () => {
  const [services, isPending] = useCategory();
  console.log(services);
  if (isPending) {
    return (
      <div className="w-full">
        <DotLoader
          color="#ff0800"
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mx-auto"
        />
      </div>
    );
  }
  return (
    <div className="container mx-auto px-5">
      <SectionTitle
        heading={"Our Service Types"}
        subHeading={"Explore the Range of Solutions We Offer"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {services.map((item, idx) => (
          <CardOurServices key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OurServices;
