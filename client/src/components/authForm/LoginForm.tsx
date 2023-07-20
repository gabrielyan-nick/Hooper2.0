import React from "react";
import * as yup from "yup";
import { authErrors } from "@/data/authErrors";

const loginSchema = yup.object({
  username: yup
    .string()
    .max(20, "Максимум 20 символів")
    .min(2, "Мінімум 2 символи")
    .required("Введіть ім'я користувача"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Введіть пароль"),
});

const LoginForm = () => {
  return <div>LoginForm</div>;
};

export default LoginForm;
