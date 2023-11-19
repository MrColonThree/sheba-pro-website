import { useQuery } from "@tanstack/react-query";
import { DotLoader } from "react-spinners";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ServiceCard from "../../../../Components/serviceCard";
const ServicesByCategory = ({ serviceName }) => {
  const axiosPublic = useAxiosPublic();
  const serviceData = () =>
    axiosPublic(`/service/${serviceName}`).then((res) => res.data);
  const { data: services = [], isPending } = useQuery({
    queryKey: ["services"],
    queryFn: serviceData,
  });
  const cardsPerPage = 6;
  const totalSlides = Math.ceil(services.length / cardsPerPage);
  const slides = Array.from({ length: totalSlides }, (_, index) => index);
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handlePaginationClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
      setActiveIndex(index);
    }
  };
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
    <div>
      <Swiper
        className="mySwiper"
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
        }}
        onSlideChange={(swiperInstance) => {
          setActiveIndex(swiperInstance.activeIndex);
        }}
      >
        {slides.map((slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
              {services
                .slice(
                  slideIndex * cardsPerPage,
                  (slideIndex + 1) * cardsPerPage
                )
                .map((service) => (
                  <ServiceCard key={service._id} card={service} />
                ))}
            </div>
          </SwiperSlide>
        ))}
        <div className="flex justify-center mt-4">
          {slides.map((slideIndex) => (
            <button
              key={slideIndex}
              className={`cursor-pointer text-white text-lg border border-black font-bold rounded-full mx-2 py-1 px-3 ${
                activeIndex === slideIndex ? "bg-red-600" : "bg-gray-700"
              }`}
              onClick={() => handlePaginationClick(slideIndex)}
            >
              {slideIndex + 1}
            </button>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default ServicesByCategory;
