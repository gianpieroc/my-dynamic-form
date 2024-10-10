import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QuestionsContextProvider } from "./contexts/questions";
import { AnswersContextProvider } from "./contexts/answers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QuestionsContextProvider>
      <AnswersContextProvider>
        <App />
      </AnswersContextProvider>
    </QuestionsContextProvider>
  </React.StrictMode>,
);

reportWebVitals();
