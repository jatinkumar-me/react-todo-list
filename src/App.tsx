import { Button, Container } from "@mui/material";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import { Add } from "@mui/icons-material";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function handleClick() {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container maxWidth="md" sx={{ minHeight: "90vh" }}>
        <TodoList />
        {!isFormOpen ? (
          <Button onClick={handleClick} startIcon={<Add />}>
            Click to add
          </Button>
        ) : (
          <TodoForm onCancel={handleClick} />
        )}
      </Container>
      <Footer />
    </>
  );
}

export default App;
