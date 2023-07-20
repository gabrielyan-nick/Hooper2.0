"use client";

import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { useRouter } from "next/navigation";

const UserLoginWidget = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="absolute top-3 right-3 z-10">
      {/* {user ? <UserWidget/> : <></>} */}
      <button
        onClick={() => router.push("/login")}
        className="flex items-center justify-center font-play font-semibold rounded-3xl px-8 py-2.5 text-white bg-greenWidget hover:bg-lightGreen transition-all duration-300 active:scale-95 shadow-inOutFull"
      >
        Увійти
      </button>
    </div>
  );
};

export default UserLoginWidget;
