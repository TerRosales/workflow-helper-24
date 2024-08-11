// Import Lottie and the animation data
import Lottie from "lottie-react";
import animationData from "../assets/animationData.json"; // Adjust the path to your Lottie JSON file

const LottieAnimation = () => {
  // Set up the options for the Lottie animation
  const options = {
    animationData: animationData,
    loop: false, // Disable looping of the animation
    autoplay: true, // Enable autoplay so the animation starts automatically
  };

  // Render the Lottie animation with the specified options
  return <Lottie {...options} />;
};

export default LottieAnimation;

// Example usage of LottieAnimation component
<figure className="w-20 h-20 mx-auto">
  <LottieAnimation />
</figure>;
