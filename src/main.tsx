import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TodoProvider, { initialTodoState } from './context/TodoProvider.tsx'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <TodoProvider initialTodoState={initialTodoState}>
      <App />
    </TodoProvider>
  </React.StrictMode>,
)
