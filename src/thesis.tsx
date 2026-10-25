import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThesisPage } from "./components/ThesisPage";
import "./styles/tokens.css";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThesisPage />
  </StrictMode>,
);
