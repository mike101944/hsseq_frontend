// File: TopProgressBar.jsx
import React, { useEffect, useState } from "react";

export const TopProgressBar = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 90) return oldProgress;
          return oldProgress + Math.random() * 10; // increment randomly for animation
        });
      }, 100);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 200); // hide after completed
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className="h-1 bg-green-500 transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
