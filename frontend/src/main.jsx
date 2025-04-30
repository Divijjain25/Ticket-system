import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChatbotProvider } from "./contexts/ChatbotContext.jsx";
import { TicketProvider } from "./contexts/TicketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatbotProvider>
      <TicketProvider>
        <App />
      </TicketProvider>
    </ChatbotProvider>
  </StrictMode>
);
