// Import React, Lottie, and the animation data
import Lottie from "lottie-react";
import animationData3 from "../assets/animationData3.json"; // Adjust the path to your Lottie JSON file

const LottieAnimation3 = () => {
  // Render the Lottie animation with loop and autoplay enabled
  return <Lottie animationData={animationData3} loop={true} autoplay={true} />;
};

export default LottieAnimation3;
