import { keyframes } from "@chakra-ui/react";
import React, { useState } from "react";

const useShakeAnimation = () => {
  const [isShaking, setIsShaking] = useState(false);

  const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

  const shakeAnimation = `${shake} 0.5s linear`;
  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 500); // Stop the animation after 1 second
  };

  return { shakeAnimation, handleShake, isShaking };
};

export default useShakeAnimation;
