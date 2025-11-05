"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import React, { useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie] = useCookies(["@token", "username"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(cookies);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const password = formData.get("password")?.toString() ?? "";
    const username = formData.get("username")?.toString() ?? "";

    if (!password || !username) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    if (password.length < 8) {
      alert("Пароль должен содержать не менее 8 символов.");
      return;
    }

    try {
      debugger;
      const body = new URLSearchParams();
      body.append("username", username);
      body.append("password", password);

      const res = await fetch("http://94.230.232.40:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await res.json();

      if (data.access_token) {
        setCookie("@token", data.access_token, { path: "/" });
        setCookie("username", username, { path: "/" });
        setTimeout(() => {
          window.location.href = "/";
        }, 300);
      } else {
        alert("Ошибка при входе: " + (data.detail || "Неизвестная ошибка"));
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      alert("Произошла ошибка при попытке войти. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Вход в систему
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Введите email и пароль!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} id="adminsignin">
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input name="username" placeholder="Ваш Username" type="text" />
                </div>
                <div>
                  <Label>
                    Пароль <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Введите ваш пароль"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-light-700 hover:bg-blue-light-900 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center" 
                  >
                    Войти
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Нет аккаунта?{" "}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}