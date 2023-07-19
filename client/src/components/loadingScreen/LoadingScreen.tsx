import React, { forwardRef, useEffect, useRef, memo } from "react";
// import { BtnSpinnerWrapper, LoadingScreenWrapper } from "./microComponets";
import { BasketballMarker, FootballMarker } from "../ui/markers";
import { HooperLogoIcon } from "../ui/icons";

// const balls = [<BasketballMarker />, <FootballMarker />];

const LoadingScreen = () => {
  return (
    <div className="fixed z-30 w-screen h-screen flex flex-col justify-center items-center gap-10 bg-loadingScreen dark:bg-darkLoadingScreen">
      <HooperLogoIcon className="animate-fadeIn" />
    </div>

    // <div
    //   style={{
    //     marginLeft: "25px",
    //     opacity: 0,
    //     transition: "opacity .7s",
    //   }}
    //   ref={logoRef}
    // >
    //   <HooperLogoIcon main={theme.logo.main} net={theme.logo.net} />
    // </div>
    // <BtnSpinnerWrapper style={{ animationDuration: "1.5s" }}>
    //   {balls[Math.floor(Math.random() * 2)]}
    // </BtnSpinnerWrapper>
  );
};
export default LoadingScreen;
