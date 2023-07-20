"use client";

import React from "react";
import { BackIcon, CloseIcon } from "./icons";
import cn from "clsx";
import { useRouter } from "next/navigation";

interface IHeader {
  isBackBtn?: boolean;
  title?: string;
}

const Header = ({ isBackBtn = false, title }: IHeader) => {
  const router = useRouter();
  return (
    <div
      className={cn("flex items-center p-[5px]", {
        "justify-end": !isBackBtn && !title,
        "justify-between": (isBackBtn && title) || isBackBtn,
      })}
    >
      {isBackBtn && (
        <button
          onClick={() => router.back()}
          className="header-btn bg-orange-500 hover:bg-orange-700"
        >
          <BackIcon />
        </button>
      )}
      {title && (
        <h1
          className={cn(
            "font-bold text-lg text-courtTitle dark:bg-darkCourtTitle",
            {
              "m-auto pl-[30px]": !isBackBtn && title,
            }
          )}
        >
          {title}
        </h1>
      )}
      <button
        onClick={() => router.push("/")}
        className={cn("header-btn bg-red-600 hover:bg-red-800")}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Header;
