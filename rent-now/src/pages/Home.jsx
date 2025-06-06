import React from "react";
import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import FindByCollege from "../components/FindByCollege";
import SliderBanner from "../components/SliderBanner";
import PGMainContainer from "../components/PGMainContainer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Menubar />
      <SliderBanner />
      <FindByCollege />
      <PGMainContainer/>
    </>
  );
};

export default Home;
