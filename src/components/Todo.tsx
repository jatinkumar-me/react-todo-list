import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  TODO_ACTION_KIND,
  Todo,
  TodoDispatchContext,
} from "../context/TodoProvider";
import { timeAgo } from "../utils/TimeAgo";
import {
  CalendarMonthOutlined,
  Close,
  Delete,
  Edit,
  Flag,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import FlexBetween from "./FlexBetween";

type PropType = {
  todo: Todo;
};

function getFlagColor(priority: Todo["priority"]) {
  switch (priority) {
    case "critical":
      return "error";
    case "normal":
      return "primary";
    case "low":
      return "inherit";
  }
}

export default function TodoComponent({ todo }: PropType) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useContext(TodoDispatchContext);
  const [open, setOpen] = useState(false);
  let timeout: number;

  const handleClick = () => {
    if (!isChecked) setOpen(true);
    setIsChecked(true);
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    } else if (reason === "undo") {
      clearTimeout(timeout);
      setIsChecked(false);
    }
    setOpen(false);
  };

  function handleDelete() {
    dispatch({ type: TODO_ACTION_KIND.DELETE, payload: todo });
  }

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  const action = (
    <>
      <Button color="primary" size="small" onClick={(e) => handleClose(e, "undo")}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  useEffect(() => {
    if (isChecked) {
      timeout = setTimeout(() => handleDelete(), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isChecked]);

  if (isEditing) return <TodoForm todo={todo} onCancel={handleEdit} />;

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
        <Checkbox checked={isChecked} onChange={handleClick} />
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="One todo completed successfully"
          action={action}
        />
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
          <FlexBetween>
            <Box display={"flex"}>
              {todo.dueDate && (
                <Box
                  display={"inline-flex"}
                  alignItems={"center"}
                  gap={"0.2rem"}
                >
                  <CalendarMonthOutlined fontSize="small" />
                  <Typography variant="body2" mr={"0.2rem"}>
                    {`${format(todo.dueDate, "d MMMM, eeee")}`}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                </Box>
              )}
              <Flag color={getFlagColor(todo.priority)} />
              <Typography variant="body2">{todo.priority}</Typography>
            </Box>
            <Typography variant="body2">
              {`Added ${timeAgo(todo.dateCreated)} ago`}
            </Typography>
          </FlexBetween>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
