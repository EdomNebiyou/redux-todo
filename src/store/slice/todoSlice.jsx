import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
const initialState = {
  todoList: [],
};
const todoReducer = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      const newlyTodo = {
        id: nanoid(),
        title: action.payload,
      };
      state.todoList.push(newlyTodo);
      return state;
    },
    deleteTodo(state, action) {
      console.log(action);
      state.todoList = state.todoList.filter(
        (todoItem) => todoItem.id !== action.payload
      );
      return state;
    },
    editTodo(state, action) {
      let getTodo = state.todoList;
      let getCurrentTodoIndex = getTodo.findIndex(
        (item) => item.id === action.payload.currentEdited
      );
      getTodo[getCurrentTodoIndex] = {
        ...getTodo,
        title: action.payload.currentTodo,
      };
      state.todoList=getTodo
      return state;
    },
  },
});
export const { addTodo, deleteTodo, editTodo } = todoReducer.actions;
export default todoReducer.reducer;
