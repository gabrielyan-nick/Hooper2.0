import React from "react";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-10 bg-overlay flex justify-center py-7 sm:py-10 md:py-24 animate-fadeIn">
      <div className="max-w-[420px] w-[98%] h-max min-h-[300px] overflow-hidden bg-mainBg dark:bg-darkMainBg shadow-mainShadow dark:shadow-darkMainShadow rounded-lg animate-open">
        {children}
      </div>
    </div>
  );
};

export default Overlay;
