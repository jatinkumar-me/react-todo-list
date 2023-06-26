import { useContext, useState } from "react";
import { Todo, TodoStateContext } from "../context/TodoProvider";
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import TodoComponent from "./Todo";
import { Flag, Sort } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { SearchContext } from "../context/SearchProvider";

type SortingCriteria = "title" | "dateCreated";
type FilteringCriteria = Todo["priority"] | "all";

export default function TodoList() {
  const { todos } = useContext(TodoStateContext);
  const { searchTerm } = useContext(SearchContext);

  const [sortingCriteria, setSortingCriteria] =
    useState<SortingCriteria>("dateCreated");
  const [filteringCriteria, setFilteringCriteria] =
    useState<FilteringCriteria>("all");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilter = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: FilteringCriteria
  ) => {
    setFilteringCriteria(newFilter);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"0.2rem"}>
      <FlexBetween marginTop={"0.8rem"} marginBottom={"0.5rem"}>
        <ToggleButtonGroup
          value={filteringCriteria}
          exclusive
          onChange={handleFilter}
          aria-label="filtering criteria"
          size="small"
        >
          <ToggleButton value="all" aria-label="all">
            All
          </ToggleButton>
          <ToggleButton value="low" aria-label="low">
            <Flag color="inherit" />
          </ToggleButton>
          <ToggleButton value="normal" aria-label="normal">
            <Flag color="primary" />
          </ToggleButton>
          <ToggleButton value="critical" aria-label="critical">
            <Flag color="error" />
          </ToggleButton>
        </ToggleButtonGroup>
        {searchTerm !== "" && (
          <Typography>{`Showing results for "${searchTerm}"`}</Typography>
        )}
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
      <Divider />
      <Box>
        {todos
          .filter((todo) =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((todo) => {
            if (filteringCriteria === "all") return true;
            return todo.priority === filteringCriteria;
          })
          .sort((firstTodo, secondTodo) => {
            switch (sortingCriteria) {
              case "dateCreated":
                return (
                  firstTodo.dateCreated.getTime() - secondTodo.dateCreated.getTime()
                );
              case "title":
                return firstTodo.title.localeCompare(secondTodo.title);
            }
          })
          .map((todo) => (
            <TodoComponent key={todo.id} todo={todo} />
          ))}
      </Box>
    </Box>
  );
}
