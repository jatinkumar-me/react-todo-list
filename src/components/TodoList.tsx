import { useContext } from "react";
import { TODO_ACTION_KIND, TodoDispatchContext, TodoStateContext } from "../context/TodoProvider";
import { Button, Container } from "@mui/material";
import TodoComponent from "./Todo";

export default function TodoList() {

  const { todos } = useContext(TodoStateContext);
  const dispatch = useContext(TodoDispatchContext);

  function handleClick() {
    dispatch({
      type: TODO_ACTION_KIND.ADD,
      payload: {
        id: "2332432",
        title: "jatin",
        dateCreated: new Date(),
        description: "new descritipn",
        priority: "low"
      }
    })
  }
  return <Container>
    {todos.map((todo) =>
      <TodoComponent key={todo.id} todo={todo}/>
    )}
    <Button onClick={handleClick}>Click to add</Button>
  </Container>
}

