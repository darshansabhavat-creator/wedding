import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(<App />);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

const watchReveals = () => {
  document
    .querySelectorAll(".reveal:not(.visible)")
    .forEach((element) => observer.observe(element));
};

watchReveals();
new MutationObserver(watchReveals).observe(document.getElementById("root"), {
  childList: true,
  subtree: true,
});
