// src/components/LottieAnimation2.jsx
import React from "react";
import Lottie from "lottie-react";
import animationData2 from "../assets/animationData2.json"; // Adjust the path to your Lottie JSON file

const LottieAnimation2 = () => {
  return <Lottie animationData={animationData2} loop={true} autoplay={true} />;
};

export default LottieAnimation2;
