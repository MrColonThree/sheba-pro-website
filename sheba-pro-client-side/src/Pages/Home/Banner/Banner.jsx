import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SingleBanner from "./SingleBanner";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { DotLoader } from "react-spinners";
const fade = (props, state) => {
  const transitionTime = props.transitionTime + "ms";
  const transitionTimingFunction = "ease-in-out";

  let slideStyle = {
    position: "absolute",
    display: "block",
    minHeight: "100%",
    opacity: 0,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    transitionTimingFunction: transitionTimingFunction,
    msTransitionTimingFunction: transitionTimingFunction,
    MozTransitionTimingFunction: transitionTimingFunction,
    WebkitTransitionTimingFunction: transitionTimingFunction,
    OTransitionTimingFunction: transitionTimingFunction,
  };

  if (!state.swiping) {
    slideStyle = {
      ...slideStyle,
      WebkitTransitionDuration: transitionTime,
      MozTransitionDuration: transitionTime,
      OTransitionDuration: transitionTime,
      transitionDuration: transitionTime,
      msTransitionDuration: transitionTime,
    };
  }

  return {
    slideStyle,
    selectedStyle: { ...slideStyle, opacity: 1, position: "relative" },
    prevStyle: { ...slideStyle },
  };
};
const Banner = () => {
  const axiosPublic = useAxiosPublic();
  const bannerData = () => axios("/hero.json").then((res) => res.data);
  const { data, error, isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: bannerData,
  });
  if (error) return <p>{error.message}</p>;
  if (isLoading) {
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
    <div>
      <Carousel
        showArrows={false}
        infiniteLoop={true}
        autoPlay={true}
        dynamicHeight={false}
        stopOnHover={true}
        interval={1500}
        transitionTime={1000}
        animationHandler={fade}
        swipeAnimationHandler={false}
        swipeable={false}
        showIndicators={false}
        showThumbs={false}
      >
        {data.map((banner, index) => (
          <SingleBanner key={index} banner={banner} index={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
