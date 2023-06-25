import { createContext, useReducer, ReactElement } from "react";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  dateCreated: Date;
  dueDate?: Date;
  priority: "critical" | "normal" | "low";
};

export type TodoState = { todos: Todo[] };

export const initialTodoState: TodoState = { todos: [] };

export enum TODO_ACTION_KIND {
  ADD = "ADD",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}

export type TodoAction = {
  type: TODO_ACTION_KIND;
  payload: Todo;
};

const reducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TODO_ACTION_KIND.ADD: {
      return { todos: [...state.todos, action.payload] };
    }

    case TODO_ACTION_KIND.DELETE: {
      const { id } = action.payload;
      const filteredTodos = state.todos.filter((todo) => todo.id !== id);
      return { todos: filteredTodos };
    }

    case TODO_ACTION_KIND.UPDATE: {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      return { todos: updatedTodos };
    }

    default:
      throw new Error("Unidentified reducer action type!");
  }
};

/*
 * This is the preferred way to using React's context API along with useReducer Hook
 * SEE:
 * https://www.nielskrijger.com/posts/2021-02-16/use-reducer-and-use-context
 */

export const TodoStateContext = createContext<TodoState>(initialTodoState);
export const TodoDispatchContext = createContext<React.Dispatch<TodoAction>>(
  () => {}
);

type PropType = {
  children?: ReactElement | ReactElement[];
  initialTodoState: TodoState;
};

const TodoProvider = ({
  children,
  initialTodoState,
}: PropType): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialTodoState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export default TodoProvider;
