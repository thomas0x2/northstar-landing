import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { VisionPage } from "./components/VisionPage";
import "./styles/tokens.css";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VisionPage />
  </StrictMode>,
);
