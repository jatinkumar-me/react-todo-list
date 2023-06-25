import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  TODO_ACTION_KIND,
  Todo,
  TodoDispatchContext,
} from "../context/TodoProvider";
import { useContext, useState } from "react";
import FlexBetween from "./FlexBetween";
import { Flag } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { generateId } from "../utils/UniqueID";

type PropTypes = {
  todo?: Todo;
  onCancel: () => void;
};

type Priority = Todo["priority"];

export default function TodoForm({ todo, onCancel }: PropTypes) {
  const isEditForm: boolean = typeof todo !== "undefined";
  const [title, setTitle] = useState(todo?.title ?? "");
  const [description, setDescription] = useState(todo?.description ?? "");
  const [dueDate, setDueDate] = useState(todo?.dueDate ?? new Date());
  const [priority, setPriority] = useState(todo?.priority ?? "normal");
  const canSave: boolean = title.length > 0;

  const dispatch = useContext(TodoDispatchContext);

  function handleSubmit() {
    if (isEditForm) handleEdit();
    else handleAddNew();
  }

  function handleEdit() {
    if (!todo) return;
    const updatedTodo: Todo = {
      ...todo,
      title,
      description,
      dueDate,
      priority,
    };
    dispatch({ type: TODO_ACTION_KIND.UPDATE, payload: updatedTodo });
    onCancel();
  }

  function handleAddNew() {
    const id = generateId();
    const newTodo: Todo = {
      id,
      title,
      description,
      dueDate,
      priority,
      dateCreated: new Date(),
    };
    dispatch({ type: TODO_ACTION_KIND.ADD, payload: newTodo });
    setTitle("");
    setDescription("");
  }

  return (
    <form>
      <Box
        display={"flex"}
        flexDirection={"column"}
        padding={"1rem"}
        gap={"1rem"}
      >
        <TextField
          label="Title"
          aria-label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          size="small"
          variant="standard"
          autoFocus
          inputProps={{ style: { fontSize: 30 } }}
        />
        <TextField
          label="Description"
          aria-label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          multiline
          rows={"2"}
          size="small"
          variant="standard"
        />
        <FlexBetween>
          <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
            <FormControl>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                labelId="priority"
                value={priority}
                label={"Priority"}
                onChange={(e) => {
                  const value = e.target.value as Priority;
                  setPriority(value);
                }}
                sx={{
                  height: "40px",
                }}
              >
                <MenuItem value={"low"}>
                  <Flag fontSize="small" />
                  Low
                </MenuItem>
                <MenuItem value={"normal"}>
                  <Flag color="primary" fontSize="small" />
                  Normal
                </MenuItem>
                <MenuItem value={"high"}>
                  <Flag color="error" fontSize="small" />
                  Critical
                </MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due date"
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue ?? new Date())}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={"0.5rem"}
          >
            <Button
              variant="outlined"
              aria-label="Cancel"
              color="error"
              onClick={onCancel}
              size="small"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              aria-label="Submit"
              color="primary"
              disabled={!canSave}
              onClick={handleSubmit}
              size="small"
            >
              Submit
            </Button>
          </Box>
        </FlexBetween>
        <Divider />
      </Box>
    </form>
  );
}
