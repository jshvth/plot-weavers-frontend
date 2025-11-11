import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        "service_l7560ud",
        "template_rpffiyf",
        formData,
        "6P2xTOkURtrIol1EK"
      )
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => setStatus("error"));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-6">
        Contact <span className="text-pink-500">Support</span>
      </h1>

      {status === "success" && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
          ✅ Nachricht erfolgreich gesendet!
        </div>
      )}
      {status === "error" && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
          ❌ Fehler beim Senden. Bitte später erneut versuchen.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Dein Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Deine E-Mail-Adresse"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Betreff"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          name="message"
          placeholder="Schreibe deine Nachricht..."
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition mt-6"
        >
          {status === "sending" ? "Sende..." : "Nachricht senden"}
        </button>
      </form>
    </div>
  );
}
