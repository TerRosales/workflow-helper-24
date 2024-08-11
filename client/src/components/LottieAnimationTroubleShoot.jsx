// Import React, Lottie, and the animation data
import Lottie from "lottie-react";
import animationData2 from "../assets/animationData2.json"; // Adjust the path to your Lottie JSON file

const LottieAnimation2 = () => {
  // Render the Lottie animation with loop and autoplay enabled
  return <Lottie animationData={animationData2} loop={true} autoplay={true} />;
};

export default LottieAnimation2;
