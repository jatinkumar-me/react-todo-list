import { Box, Paper, Typography } from "@mui/material";
import { Todo } from "../context/TodoProvider";

type PropType = {
  todo: Todo
}
export default function TodoComponent({ todo }: PropType) {
  return (
    <Paper>
      <Box>
        <Typography variant="h4">
          {todo.title}
        </Typography>
        <Typography variant="body1">
          {todo.description}
        </Typography>
      </Box>
    </Paper>
  )
}
