import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ServicesByCategory from "./ServicesByCategory/ServicesByCategory";
const Services = () => {
  const categories = [
    "Plumber",
    "Electrician",
    "Technician",
    "Delivery",
    "HomeCare",
    "Event Services",
  ];
  const { service } = useParams();
  const initialIndex = categories.indexOf(service || "Plumber");
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [activeIndex, setActiveIndex] = useState(tabIndex);
  return (
    <div className="container mx-auto px-5">
      <Helmet>
        <title>Sheba Pro | Services</title>
      </Helmet>
      <Tabs
        className="text-center my-20 px-5"
        defaultIndex={tabIndex}
        onSelect={(index) => {
          setTabIndex(index);
          setActiveIndex(index);
        }}
      >
        <TabList className="flex justify-center items-center gap-5">
          {categories.map((category, index) => (
            <Tab key={index} className="border-none">
              <Link
                to={`/services/${category}`}
                className={`uppercase font-bold text-lg  pb-1 border-b-4 border-transparent hover:border-red-700 hover:text-red-600 ${
                  activeIndex === index ? "border-red-700 text-red-600" : ""
                }`}
              >
                {category}
              </Link>
            </Tab>
          ))}
        </TabList>
        {categories.map((serviceName, idx) => (
          <TabPanel key={idx}>
            <ServicesByCategory serviceName={serviceName} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default Services;
