import React, { forwardRef, useEffect, useRef, memo } from "react";
import { BasketballMarker, FootballMarker } from "../ui/markers";
import { HooperLogoIcon } from "../ui/icons";

// eslint-disable-next-line react/jsx-key
const balls = [<BasketballMarker />, <FootballMarker />];

const LoadingScreen = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="fixed z-30 w-screen h-screen flex flex-col justify-center items-center gap-3 bg-loadingScreen dark:bg-darkLoadingScreen"
    >
      <HooperLogoIcon className="animate-fadeInSlow ml-5" />
      <div className="animate-slowSpin">
        {balls[Math.floor(Math.random() * 2)]}
      </div>
    </div>
  );
});

LoadingScreen.displayName = "LoadingScreen";
export default LoadingScreen;
