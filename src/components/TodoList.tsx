import { useContext, useState } from "react";
import { TodoStateContext } from "../context/TodoProvider";
import { Box, Button, Container } from "@mui/material";
import TodoComponent from "./Todo";
import TodoForm from "./TodoForm";
import { Add } from "@mui/icons-material";

export default function TodoList() {
  const { todos } = useContext(TodoStateContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleClick() {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <Container maxWidth="md" sx={{minHeight: "90vh"}}>
      <Box>
        {todos.map((todo) => (
          <TodoComponent key={todo.id} todo={todo} />
        ))}
      </Box>
      {!isFormOpen ? (
        <Button onClick={handleClick} startIcon={<Add />}>Click to add</Button>
      ) : (
        <TodoForm onCancel={handleClick} />
      )}
    </Container>
  );
}
