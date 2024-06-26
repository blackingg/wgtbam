"use client";

import React, { useEffect, useState } from "react";

export const CountdownTimer: React.FC<{ onFinish: () => void }> = ({
  onFinish,
}) => {
  const [timeLeft, setTimeLeft] = useState(90);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinish]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  const circleStyle = {
    background: `conic-gradient(white ${360 - timeLeft * (12 / 5)}deg, red 0deg)`,
  };

  return (
    <div className="hideforthird1 relative flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-full px-4 md:h-[100px] md:w-[100px]">
      <div
        className="circle-cover absolute border-8 border-white"
        style={circleStyle}
      >
        <div className="inner-cover text-sm font-semibold">
          {formattedMinutes}:{formattedSeconds}
        </div>
      </div>
    </div>
  );
};
