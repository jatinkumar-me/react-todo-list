import { useContext, useState } from "react";
import { Todo, TodoStateContext } from "../context/TodoProvider";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import TodoComponent from "./Todo";
import { Sort } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { SearchContext } from "../context/SearchProvider";

type SortingCriteria = "title" | "dateCreated";
type FilteringCriteria = Todo["priority"] | "";

export default function TodoList() {
  const { todos } = useContext(TodoStateContext);
  const [sortingCriteria, setSortingCriteria] =
    useState<SortingCriteria>("dateCreated");
  const [filteringCriteria, setFilteringCriteria] =
    useState<FilteringCriteria>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { searchTerm } = useContext(SearchContext);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <FlexBetween>
        <Button
          id="sort-by"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          startIcon={<Sort />}
          color="inherit"
        >
          Sort by
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setSortingCriteria("title");
              handleClose();
            }}
            id="title"
          >
            Title
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortingCriteria("dateCreated");
              handleClose();
            }}
            id="dateCreated"
          >
            Date Created
          </MenuItem>
        </Menu>
      </FlexBetween>
      <Box>
        {todos
          .filter((todo) =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((todo) => {
            if (filteringCriteria === "") return true;
            return todo.priority === filteringCriteria;
          })
          .sort((todoA, todoB) => {
            switch (sortingCriteria) {
              case "dateCreated":
                return (
                  todoA.dateCreated.getTime() - todoB.dateCreated.getTime()
                );
              case "title":
                return todoA.title.localeCompare(todoB.title);
            }
          })
          .map((todo) => (
            <TodoComponent key={todo.id} todo={todo} />
          ))}
      </Box>
    </Box>
  );
}
