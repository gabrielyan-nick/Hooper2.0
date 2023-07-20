"use client";

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type TAuth = "login" | "register";

const AuthForm = () => {
  const [formType, setFormType] = useState<TAuth>("login");
  const [isSuccessReg, setIsSuccessReg] = useState(false);

  return formType === "login" ? <LoginForm /> : <RegisterForm />;
};
export default AuthForm;
