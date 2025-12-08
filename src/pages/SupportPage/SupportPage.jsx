import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function Toast({ message, type }) {
  return (
    <div
      className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white 
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
        animate-fade-in-up`}
    >
      {message}
    </div>
  );
}

export default function SupportPage() {
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
        setToast({ type: "success", msg: "Email sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => setToast({ type: "error", msg: "Error sending message." }));
  };

  // Toast automatisch nach 2.5s ausblenden
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-6">
        Contact <span className="text-pink-500">Support</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          name="message"
          placeholder="Write your message..."
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition mt-6"
        >
          Send message
        </button>
      </form>

      {toast && <Toast message={toast.msg} type={toast.type} />}
    </div>
  );
}
