import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

function Toast({ message, type }) {
  return (
    <div
      className={`
        fixed bottom-6 right-6 
        px-4 py-3 rounded-lg shadow-lg text-white z-50
        ${type === "success" ? "bg-green-400" : "bg-red-400"}
        animate-fade-in-up
      `}
    >
      {message}
    </div>
  );
}

export default function SupportPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [toast, setToast] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_l7560ud",
        "template_rpffiyf",
        formData,
        "6P2xTOkURtrIol1EK"
      )
      .then(() => {
        setToast({ type: "success", msg: t("support.toastSuccess") });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => setToast({ type: "error", msg: t("support.toastError") }));
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-12 sm:mb-20">
        <div className="soft-panel p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-6 font-space">
            {t("support.titlePrefix")}
            <span className="text-pink-500">{t("support.titleEmphasis")}</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t("support.name")}
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("support.email")}
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          />
          <input
            type="text"
            name="subject"
            placeholder={t("support.subject")}
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
          <textarea
            name="message"
            placeholder={t("support.message")}
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            required
          />

          <button
            type="submit"
            className="w-full px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition mt-6"
          >
            {t("support.send")}
          </button>
          </form>
        </div>
      </div>

      {/* Toast OUTSIDE so it always aligns to viewport */}
      {toast && <Toast message={toast.msg} type={toast.type} />}
    </>
  );
}
