import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategory = () => {
  const axiosPublic = useAxiosPublic();
  const serviceData = () => axiosPublic("/services").then((res) => res.data);
  const { data: services = [], isPending } = useQuery({
    queryKey: ["services"],
    queryFn: serviceData,
  });
  console.log(services);
  return [services, isPending];
};

export default useCategory;
