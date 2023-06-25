import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import TodoProvider, { initialTodoState } from "./context/TodoProvider.tsx";
import { CssBaseline } from "@mui/material";
import SearchProvider from "./context/SearchProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <TodoProvider initialTodoState={initialTodoState}>
      <SearchProvider>
        <App />
      </SearchProvider>
    </TodoProvider>
  </React.StrictMode>
);
