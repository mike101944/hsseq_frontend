import React, { useState, useEffect } from "react";
import "./CircularProgressBar.css";

export const CircularProgress = ({ endValue, size ,speed  }) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let progress = setInterval(() => {
      setProgressValue((prev) => {
            if (prev < endValue) {
             return prev + 1;
                } else {
                     clearInterval(progress);
                return prev;
            }
        });
    }, speed);

    return () => clearInterval(progress); // Cleanup on unmount
  }, [endValue, speed]);

  return (
    <div
      className="circular-progress"
      style={{
        height: size,
        width: size,
        background: `conic-gradient(
         #4d5bf9 ${progressValue * 3.6}deg,
          #cadcff ${progressValue * 3.6}deg
        )`,
      }}
    >
      <div className="value-container">{progressValue}%</div>
    </div>
  );
};

