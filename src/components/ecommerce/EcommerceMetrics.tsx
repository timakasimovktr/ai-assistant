"use client";
import React, { useEffect, useState } from "react";
import { GroupIcon } from "@/icons";
import MonthlySalesChartTG from "@/components/ecommerce/MonthlySalesChartTG";
import axios from "axios";
import Button from "../ui/button/Button";
import { useCookies } from "react-cookie";

export const EcommerceMetrics = () => {
  type EcommerceMetric = {
    id: number;
    phone_number: string;
    visit_type: string;
    prisoner_name: string;
    relatives: string;
    created_at: string;
    status: string;
    start_datetime: string | null;
    end_datetime: string | null;
    rejection_reason: string | null;
    user_id: number;
    telegram_chat_id: string;
  };

  type TelegramInfo = {
    id: number;
    phone_number: string;
    username: string;
    first_name: string;
    last_name: string;
    is_bot: boolean;
    created_at: string;
  };

  type KnowledgeBase = {
    id: number;
    name: string;
    company: string;
    description: string;
    mission: string;
    tone: string;
    contact: {
      phone: string;
      email: string;
      site: string;
      instagram: string;
      telegram: string;
    };
    kb: string;
    user_id: number;
    phone_number: string | null;
    username: string;
    created_at: string;
    updated_at: string | null;
  };

  // Integration status states
  const [hasTelegram, setHasTelegram] = useState(false);
  const [telegramInfo, setTelegramInfo] = useState<TelegramInfo | null>(null);
  const [hasInstagram, setHasInstagram] = useState(false);
  const [hasTel, setHasTel] = useState(false);
  const [hasKnowledgeBase, setHasKnowledgeBase] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null);

  const [cookies] = useCookies(["@token"]);

  useEffect(() => {
    setHasInstagram(false);
    setHasTel(false);
    console.log(knowledgeBase);
  }, []);

  // Loading states
  const [loadingTelegram, setLoadingTelegram] = useState(false);
  const [loadingKB, setLoadingKB] = useState(false);

  // Bookings data
  const [info, setInfo] = useState<EcommerceMetric[]>([]);

  // Modal control
  const [modalType, setModalType] = useState<"tg" | "inst" | "tf" | "kb" | null>(null);
  const [step, setStep] = useState(1);

  // Form data consolidated into one state object
  const initialFormData = {
    phone: "",
    loginCode: "",
    telegramCode: "",
    username: "",
    password: "",
    knowledgeBase: "",
    selectedPhone: "",
    assistantName: "",
    brandName: "",
    location: "",
    isOnline: false,
    contactPhone: "",
    contactEmail: "",
    contactInstagram: "",
    contactTelegram: "",
    contactWebsite: "",
    generalInfo: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Handler for text inputs and selects
  const handleChange = (field: keyof typeof initialFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handler for checkboxes
  const handleCheckbox = (field: keyof typeof initialFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const getInfo = async () => {
    try {
      const response = await axios.get("/api/bookings");
      setInfo(Array.isArray(response.data) ? response.data : []);
    } catch {
      setInfo([]);
    }
  };

  const fetchUserProfile = async () => {
    if (!cookies["@token"]) return;

    try {
      const response = await axios.get("http://94.230.232.40:8000/api/v1/users/me", {
        headers: { Authorization: `Bearer ${cookies["@token"]}` },
      });

      console.log("User Profile:", response.data);

      // Проверяем, есть ли username — это косвенный признак, что база знаний может быть
      // Но лучше проверять отдельно
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchKnowledgeBase = async () => {
    if (!cookies["@token"]) return;

    try {
      const response = await axios.get("http://94.230.232.40:8000/api/v1/knowledge-base/", {
        headers: { Authorization: `Bearer ${cookies["@token"]}` },
      });

      if (response.data && response.data.length > 0) {
        setKnowledgeBase(response.data[0]);
        setHasKnowledgeBase(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status !== 404) {
          console.error("Error fetching knowledge base:", error);
        }
      } else {
        console.error("Error fetching knowledge base:", error);
      }
    }
  };

  const handleGetTelegramInfo = async () => {
    try {
      const response = await axios.get("http://94.230.232.40:8000/api/v1/tg-ai/me", {
        headers: { Authorization: `Bearer ${cookies["@token"]}` },
      });

      setTelegramInfo(response.data);
      setHasTelegram(true);
    } catch (error) {
      console.error("Error fetching Telegram info:", error);
    }
  };

  useEffect(() => {
    getInfo();
    handleGetTelegramInfo();
    fetchKnowledgeBase();
    fetchUserProfile();
  }, []);

  const handleRegisterPhoneTelegram = async () => {
    if (!formData.phone) {
      alert("Пожалуйста, введите номер телефона.");
      return;
    }

    setLoadingTelegram(true);
    try {
      const response = await fetch("http://94.230.232.40:8000/api/v1/tg-ai/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies["@token"]}`,
        },
        body: JSON.stringify({ phone_number: formData.phone }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, telegramCode: data.telegram_code }));
        setStep(2);
      } else {
        const err = await response.text();
        alert("Ошибка: " + err);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Ошибка сети:", error);
      } else {
        console.error("Ошибка сети:", error);
      }
    } finally {
      setLoadingTelegram(false);
    }
  };

  const handleRegisterTelegram = async () => {
    if (!formData.telegramCode) {
      alert("Введите код из SMS.");
      return;
    }

    setLoadingTelegram(true);
    try {
      const response = await fetch("http://94.230.232.40:8000/api/v1/tg-ai/key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies["@token"]}`,
        },
        body: JSON.stringify({ key: formData.telegramCode }),
      });

      if (response.ok) {
        setStep(3);
      } else {
        const err = await response.text();
        alert("Ошибка: " + err);
      }
    } catch {
      alert("Ошибка сети.");
    } finally {
      setLoadingTelegram(false);
    }
  };

  const handleRegisterTelegramLoginCode = async () => {
    if (!formData.loginCode) {
      alert("Введите логин-код.");
      return;
    }

    setLoadingTelegram(true);
    try {
      const response = await fetch("http://94.230.232.40:8000/api/v1/tg-ai/second-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies["@token"]}`,
        },
        body: JSON.stringify({ second_key: formData.loginCode }),
      });

      if (response.ok) {
        setHasTelegram(true);
        setModalType(null);
        setStep(1);
        setFormData(initialFormData);
        alert("Телеграм успешно подключен!");
        await handleGetTelegramInfo();
      } else {
        const err = await response.text();
        alert("Ошибка: " + err);
      }
    } catch {
      alert("Ошибка сети.");
    } finally {
      setLoadingTelegram(false);
    }
  };

  // НОВАЯ ФУНКЦИЯ: Создание базы знаний
  const handleCreateKnowledgeBase = async () => {
    if (
      !formData.assistantName ||
      !formData.brandName ||
      !formData.contactPhone ||
      !formData.contactEmail ||
      !formData.generalInfo
    ) {
      alert("Заполните все обязательные поля.");
      return;
    }

    setLoadingKB(true);
    try {
      const payload = {
        name: formData.assistantName,
        company: formData.brandName,
        description: formData.location || "Не указано",
        mission: "Не указано",
        tone: "Дружелюбный и экспертный",
        contact: {
          phone: formData.contactPhone,
          email: formData.contactEmail,
          site: formData.contactWebsite || "",
          instagram: formData.contactInstagram || "",
          telegram: formData.contactTelegram || "",
        },
        kb: formData.generalInfo,
      };

      const response = await fetch("http://94.230.232.40:8000/api/v1/knowledge-base/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies["@token"]}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setKnowledgeBase(data);
        setHasKnowledgeBase(true);
        setModalType(null);
        setStep(1);
        setFormData(initialFormData);
        alert("База знаний успешно создана!");
      } else {
        const err = await response.text();
        alert("Ошибка при создании базы знаний: " + err);
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка сети.");
    } finally {
      setLoadingKB(false);
    }
  };

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  // Spinner компонент
  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white inline-block"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      ></path>
    </svg>
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
      {/* Telegram Card */}
      <div
        className={`rounded-2xl border flex flex-col ${
          hasTelegram
            ? "border-green-500 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
            : "border-yellow-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
        } md:p-6`}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <svg
              className="text-gray-800 size-6 dark:text-white/90"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z"
              />
            </svg>
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white/90 leading-[1.2]">
            Телеграм аккаунт <br />{" "}
            <span className="text-gray-500 text-sm dark:text-gray-400">
              {telegramInfo?.phone_number || ""}
            </span>
          </h3>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {hasTelegram
              ? "Телеграм аккаунт подключен. Вы можете изменить настройки."
              : "Зарегистрируйте Telegram для использования услуг."}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {hasTelegram && telegramInfo?.created_at
              ? new Date(telegramInfo.created_at).toLocaleDateString()
              : ""}
          </span>
          <Button
            onClick={() => setModalType("tg")}
            variant={hasTelegram ? "green" : "red"}
            size="md"
            className="w-60 mt-8"
          >
            {hasTelegram ? "Изменить" : "Зарегистрировать"}
          </Button>
        </div>
      </div>

      {/* Instagram Card */}
      <div
        className={`rounded-2xl border flex flex-col ${
          hasInstagram
            ? "border-green-500 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
            : "border-yellow-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
        } md:p-6`}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <svg
              className="text-gray-800 size-6 dark:text-white/90"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
              />
            </svg>
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white/90">
            Instagram аккаунт {hasInstagram ? "(подключен)" : "(не подключен)"}
          </h3>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Зарегистрируйте Instagram для использования услуг.
          </span>
          <Button
            onClick={() => setModalType("inst")}
            variant={hasInstagram ? "green" : "red"}
            size="md"
            className="w-60 mt-8"
          >
            {hasInstagram ? "Изменить" : "Зарегистрировать"}
          </Button>
        </div>
      </div>

      {/* Telephony Card */}
      <div
        className={`rounded-2xl border flex flex-col ${
          hasTel
            ? "border-green-500 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
            : "border-yellow-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
        } md:p-6`}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <svg
              className="text-gray-800 size-6 dark:text-white/90"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
            </svg>
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white/90">
            Телефония
          </h3>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Подключите телефонию для работы с заявками.
          </span>
          <Button
            onClick={() => setModalType("tf")}
            variant={hasTel ? "green" : "red"}
            size="md"
            className="w-60 mt-8"
          >
            {hasTel ? "Изменить" : "Зарегистрировать"}
          </Button>
        </div>
      </div>

      {/* Knowledge Base Card */}
      <div
        className={`rounded-2xl border flex flex-col ${
          hasKnowledgeBase
            ? "border-green-500 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
            : "border-yellow-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
        } md:p-6`}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <svg
              className="text-gray-800 size-6 dark:text-white/90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 16c-4.41 0-8-1.34-8-3v-2c2.21 1.66 5.31 2 8 2s5.79-.34 8-2v2c0 1.66-3.59 3-8 3zm0-6c-4.41 0-8-1.34-8-3v-2c2.21 1.66 5.31 2 8 2s5.79-.34 8-2v2c0 1.66-3.59 3-8 3zm0-6c-4.41 0-8-1.34-8-3s3.59-3 8-3s8 1.34 8 3s-3.59 3-8 3z"
              />
            </svg>
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white/90">
            База знаний 
          </h3>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {hasKnowledgeBase
              ? "База знаний настроена. Вы можете отредактировать."
              : "Настройте базу знаний для работы ассистента."}
          </span>
          <Button
            onClick={() => {
              if (!telegramInfo) {
                alert("Сначала подключите Телеграм аккаунт.");
                return;
              } else {
                setModalType("kb");
                setStep(1);
              }
            }}
            variant="green"
            size="md"
            className="w-60 mt-8"
          >
            {hasKnowledgeBase ? "Добавить базу знаний" : "Настроить  базу знаний"}
          </Button>
        </div>
      </div>

      {/* Approved Bookings Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Завершенных заявок
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {info.filter((item) => item.status === "approved").length}
            </h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <MonthlySalesChartTG />
      </div>

      {/* Modal */}
      {modalType && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => {
            setModalType(null);
            setStep(1);
            setFormData(initialFormData);
          }}
        >
          <div
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl max-w-md w-full shadow-2xl overflow-y-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              {modalType === "tg"
                ? "Регистрация Telegram"
                : modalType === "inst"
                ? "Instagram"
                : modalType === "tf"
                ? "Телефония"
                : "Настройка базы знаний"}
            </h2>

            {/* Telegram Steps */}
            {modalType === "tg" && step === 1 && (
              <div className="flex flex-col  font-medium text-gray-700 dark:text-gray-300 gap-4">
                <label>Номер телефона:</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  className="border p-3 rounded-lg w-full"
                  placeholder="+998..."
                />
                <div className="flex gap-3 mt-4">
                  <Button
                    variant="green"
                    onClick={handleRegisterPhoneTelegram}
                    disabled={loadingTelegram}
                    className="flex-1"
                  >
                    {loadingTelegram ? <Spinner /> : "Отправить SMS"}
                  </Button>
                  <Button variant="primary" onClick={() => setModalType(null)} className="flex-1">
                    Закрыть
                  </Button>
                </div>
              </div>
            )}

            {modalType === "tg" && step === 2 && (
              <div className="flex flex-col gap-4 font-medium text-gray-700 dark:text-gray-300">
                <label>Код из SMS:</label>
                <input
                  type="text"
                  value={formData.telegramCode}
                  onChange={handleChange("telegramCode")}
                  className="border p-3 rounded-lg w-full"
                />
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="green"
                    onClick={handleRegisterTelegram}
                    disabled={loadingTelegram}
                    className="flex-1"
                  >
                    {loadingTelegram ? <Spinner /> : "Далее"}
                  </Button>
                  <Button variant="primary" onClick={() => setModalType(null)} className="flex-1">
                    Закрыть
                  </Button>
                </div>
              </div>
            )}

            {modalType === "tg" && step === 3 && (
              <div className="flex flex-col gap-4 font-medium text-gray-700 dark:text-gray-300">
                <label>Логин-код из Telegram:</label>
                <input
                  type="text"
                  value={formData.loginCode}
                  onChange={handleChange("loginCode")}
                  className="border p-3 rounded-lg w-full"
                />
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="green"
                    onClick={handleRegisterTelegramLoginCode}
                    disabled={loadingTelegram}
                    className="flex-1"
                  >
                    {loadingTelegram ? <Spinner /> : "Завершить"}
                  </Button>
                  <Button variant="primary" onClick={() => setModalType(null)} className="flex-1">
                    Закрыть
                  </Button>
                </div>
              </div>
            )}

            {/* Knowledge Base Steps */}
            {modalType === "kb" && step === 1 && (
              <div className="flex flex-col gap-4 font-medium text-gray-700 dark:text-gray-300">
                <label>Имя ассистента:</label>
                <input
                  type="text"
                  value={formData.assistantName}
                  onChange={handleChange("assistantName")}
                  className="border p-3 rounded-lg w-full"
                />
                <label>Название бренда:</label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={handleChange("brandName")}
                  className="border p-3 rounded-lg w-full"
                />
                <div className="flex gap-3 mt-6">
                  <Button variant="green" onClick={handleNextStep} className="flex-1">
                    Далее
                  </Button>
                  <Button variant="primary" onClick={() => setModalType(null)} className="flex-1">
                    Закрыть
                  </Button>
                </div>
              </div>
            )}

            {modalType === "kb" && step === 2 && (
              <div className="flex flex-col gap-4 font-medium text-gray-700 dark:text-gray-300">
                <label>Локация:</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={handleChange("location")}
                  className="border p-3 rounded-lg w-full"
                />
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isOnline} onChange={handleCheckbox("isOnline")} />
                  <label>Онлайн</label>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="primary" onClick={handlePrevStep} className="flex-1">
                    Назад
                  </Button>
                  <Button variant="green" onClick={handleNextStep} className="flex-1">
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {modalType === "kb" && step === 3 && (
              <div className="flex flex-col gap-4 font-medium text-gray-700 dark:text-gray-300">
                <label>Контакты:</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={handleChange("contactPhone")}
                  placeholder="Телефон"
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange("contactEmail")}
                  placeholder="Email"
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="text"
                  value={formData.contactInstagram}
                  onChange={handleChange("contactInstagram")}
                  placeholder="Instagram"
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="text"
                  value={formData.contactTelegram}
                  onChange={handleChange("contactTelegram")}
                  placeholder="Telegram"
                  className="border p-3 rounded-lg w-full"
                />
                <input
                  type="url"
                  value={formData.contactWebsite}
                  onChange={handleChange("contactWebsite")}
                  placeholder="Сайт"
                  className="border p-3 rounded-lg w-full"
                />
                <div className="flex gap-3 mt-6">
                  <Button variant="primary" onClick={handlePrevStep} className="flex-1">
                    Назад
                  </Button>
                  <Button variant="green" onClick={handleNextStep} className="flex-1">
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {modalType === "kb" && step === 4 && (
              <div className="flex flex-col gap-4 font-medium text-gray-700 dark:text-gray-300">
                <label>Общая информация (kb):</label>
                <textarea
                  value={formData.generalInfo}
                  onChange={handleChange("generalInfo")}
                  rows={6}
                  className="border p-3 rounded-lg w-full"
                />
                <a href="/example.txt" download className="text-green-500 hover:underline">
                  Скачать пример .txt
                </a>
                <div className="flex gap-3 mt-6">
                  <Button variant="primary" onClick={handlePrevStep} className="flex-1">
                    Назад
                  </Button>
                  <Button
                    variant="green"
                    onClick={handleCreateKnowledgeBase}
                    disabled={loadingKB}
                    className="flex-1"
                  >
                    {loadingKB ? <Spinner /> : "Сохранить"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};