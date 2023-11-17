import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { DotLoader } from "react-spinners";
import ServiceCard from "../../../Components/serviceCard";
import SectionTitle from "../../../Components/SectionTitle";
import Button from "../../../Components/Button/Button";

const Featured = () => {
  const axiosSecure = useAxiosSecure();
  const { isPending, data: featured = [] } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured");
      return res.data;
    },
  });
  console.log(featured);
  if (isPending) {
    return (
      <div className="w-full ">
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
        heading={"Discover Our Top Picks"}
        subHeading={"Find top-rated solutions recommended by our experts."}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((card) => (
          <div key={card._id}>
            <ServiceCard card={card} />
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button text={"View All Services"} />
      </div>
    </div>
  );
};

export default Featured;
