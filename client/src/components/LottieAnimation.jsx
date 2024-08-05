// LottieAnimation.jsx
import Lottie from "lottie-react";
import animationData from "../assets/animationData.json"; // Adjust the path to your Lottie JSON file

const LottieAnimation = () => {
  const options = {
    animationData: animationData,
    loop: false, // Disable looping
    autoplay: true, // Enable autoplay
  };

  return <Lottie {...options} />;
};

export default LottieAnimation;
<figure className="w-20 h-20 mx-auto">
  <LottieAnimation />
</figure>;
