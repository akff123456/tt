
import React, { useState } from "react";
import axios from "axios";

const languages = {
  kz: {
    title: "Тренд болжау",
    inputPlaceholder: "Хэштег енгізіңіз",
    button: "Болжау",
    result: "Нәтиже",
    summer: "☀️ Жазғы трендтер — 2025",
    autumn: "🍂 Күзгі трендтер — 2025",
    winter: "❄️ Қысқы трендтер — 2025",
  },
  ru: {
    title: "Прогноз тренда",
    inputPlaceholder: "Введите хэштег",
    button: "Предсказать",
    result: "Результат",
    summer: "☀️ Летние тренды — 2025",
    autumn: "🍂 Осенние тренды — 2025",
    winter: "❄️ Зимние тренды — 2025",
  },
  en: {
    title: "Trend Prediction",
    inputPlaceholder: "Enter a hashtag",
    button: "Predict",
    result: "Result",
    summer: "☀️ Summer Trends — 2025",
    autumn: "🍂 Autumn Trends — 2025",
    winter: "❄️ Winter Trends — 2025",
  },
};

export default function App() {
  const [hashtag, setHashtag] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [lang, setLang] = useState("kz");

  const t = languages[lang];

  const handlePredict = async () => {
    if (!hashtag) return;
    const res = await axios.post("http://127.0.0.1:5000/api/predict", { hashtag });
    setPrediction(res.data);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{t.title}</h1>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="kz">Қазақша</option>
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>

      <input
        type="text"
        value={hashtag}
        onChange={(e) => setHashtag(e.target.value)}
        placeholder={t.inputPlaceholder}
        style={{
          width: "100%",
          padding: "1rem",
          marginTop: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />

      <button
        onClick={handlePredict}
        style={{
          marginTop: "1rem",
          padding: "1rem 2rem",
          borderRadius: "8px",
          background: "#6366f1",
          color: "white",
          fontSize: "1rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        {t.button}
      </button>

      {prediction && (
        <div style={{ marginTop: "2rem" }}>
          <h2>{t.result}</h2>
          <p>{prediction.message}</p>
        </div>
      )}

      <div style={{ marginTop: "3rem" }}>
        <h3>{t.summer}</h3>
        <ul>
          <li>🔥 #Euro2024</li>
          <li>🔥 #iOS18</li>
          <li>🔥 #AItools2025</li>
        </ul>

        <h3 style={{ marginTop: "1.5rem" }}>{t.autumn}</h3>
        <ul>
          <li>🍂 #BackToSchool2025</li>
          <li>🍂 #KazakhstanTech</li>
          <li>🍂 #ClimateAction2025</li>
        </ul>

        <h3 style={{ marginTop: "1.5rem" }}>{t.winter}</h3>
        <ul>
          <li>❄️ #NewYears2025</li>
          <li>❄️ #CryptoForecast2025</li>
          <li>❄️ #WinterFashion2025</li>
        </ul>
      </div>
    </div>
  );
}
