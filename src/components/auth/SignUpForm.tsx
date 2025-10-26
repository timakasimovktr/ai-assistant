"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const username = formData.get("username")?.toString() ?? "";
    const full_name = formData.get("fullname")?.toString() ?? "";

    if (!email || !password || !username || !full_name) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    if (password.length < 8) {
      alert("Пароль должен содержать не менее 8 символов.");
      return;
    }

    if(username.length < 3){
      alert("Username должен содержать не менее 3 символов.");
      return;
    }

    try {
      const res = await fetch("http://94.230.232.40:8000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          full_name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Успешная регистрация:", data);
        router.push("/signin");
      } else if (data.detail === "Email already registered") {
        alert("Такой email уже зарегистрирован. Попробуйте другой.");
      } else {
        console.error("Ошибка регистрации:", data);
        alert("Ошибка регистрации. Пожалуйста, попробуйте еще раз.");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      alert("Не удалось связаться с сервером. Попробуйте позже.");
    }
  };


  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar py-10">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/signin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Назад ко входу
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Регистрация
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Введите номер телефона и пароль, чтобы зарегистрироваться!
            </p>
          </div>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="space-y-5">
                {/* <!-- Phone --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Введите ваш Email"
                  />
                </div>
                <div>
                  <Label>
                    ФИО<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Введите ваше ФИО"
                  />
                </div>
                <div>
                  <Label>
                    Username<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Введите ваш Username"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Пароль<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      name="password"
                      id="password"
                      placeholder="Введите ваш пароль"
                      type={showPassword ? "text" : "password"}
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
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Создавая аккаунт, вы соглашаетесь с{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Условиями использования,
                    </span>{" "}
                    и нашей{" "}
                    <span className="text-gray-800 dark:text-white">
                      Политикой конфиденциальности
                    </span>
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Зарегистрироваться
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Уже есть аккаунт?{" "}
                <Link
                  href="/signin"
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
