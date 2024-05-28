import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoList: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
    },
    editTodo: (state, action) => {
      const todoIndex = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );

      if (todoIndex !== -1) {
        state.todoList[todoIndex] = {
          ...state.todoList[todoIndex],
          ...action.payload,
        };
      }
    },
    removeTodo: (state, action) => {
      const todoIndex = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex !== -1) {
        state.todoList.splice(todoIndex, 1);
      }
    },
  },
});

export const { addTodo, editTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
