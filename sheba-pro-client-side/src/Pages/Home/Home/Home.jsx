import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import OurServices from "../OurServices/OurServices";

const Home = () => {
  return (
    <div className="lg:space-y-20 md:space-y-16 space-y-10">
      <Helmet>
        <title>Sheba Pro | Home</title>
      </Helmet>
      <Banner />
      <Featured />
      <OurServices />
    </div>
  );
};

export default Home;
