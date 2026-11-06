import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import OpeningBook from "./components/OpeningBook.jsx";
import "./styles.css";

function WeddingSite() {
  return (
    <>
      <audio id="wedding-audio" loop autoPlay preload="auto">
        <source src="/audio/om-namo.mp3" type="audio/mpeg" />
        <source src="/audio/om%20namo.aac" type="audio/aac" />
      </audio>
      <OpeningBook>
        <App />
      </OpeningBook>
    </>
  );
}

createRoot(document.getElementById("root")).render(<WeddingSite />);

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
