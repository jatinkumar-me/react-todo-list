import { Box, Checkbox, Divider, IconButton, Typography } from "@mui/material";
import {
  TODO_ACTION_KIND,
  Todo,
  TodoDispatchContext,
} from "../context/TodoProvider";
import { timeAgo } from "../utils/TimeAgo";
import { CalendarMonthOutlined, Delete, Edit } from "@mui/icons-material";
import { format } from "date-fns";
import { useContext, useState } from "react";
import TodoForm from "./TodoForm";

type PropType = {
  todo: Todo;
};
export default function TodoComponent({ todo }: PropType) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TodoDispatchContext);


  function handleDelete() {
    dispatch({ type: TODO_ACTION_KIND.DELETE, payload: todo });
  }

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  if (isEditing) return <TodoForm todo={todo} onCancel={handleEdit}/>;

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        display={"flex"}
        gap={"0.5rem"}
        padding={"1rem"}
        alignItems={"flex-start"}
        flexGrow={"1"}
        sx={{
          "&:hover .options": {
            visibility: "visible",
          },
        }}
      >
        <Checkbox />
        <Box flexGrow={1}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h4">{todo.title}</Typography>
            <Box
              className="options"
              display={"flex"}
              sx={{ visibility: "hidden" }}
            >
              <IconButton aria-label="Edit todo" onClick={handleEdit}>
                <Edit />
              </IconButton>
              <IconButton aria-label="Delete todo" onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="body1">{todo.description}</Typography>
          <Box display={"flex"} gap={"0.5rem"} alignItems={"center"}>
            {todo.dueDate && (
              <Box display={"inline-flex"} alignItems={"center"} gap={"0.2rem"}>
                <CalendarMonthOutlined fontSize="small" />
                <Typography variant="body2" mr={"0.2rem"}>
                  {`${format(todo.dueDate, "d MMMM, eeee")}`}
                </Typography>
                <Divider orientation="vertical" flexItem />
              </Box>
            )}
            <Typography variant="body2">
              {`Added ${timeAgo(todo.dateCreated)} ago`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
