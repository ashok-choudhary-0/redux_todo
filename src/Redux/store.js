import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../Redux/slices/TodoSlice';

export const store = configureStore({
  reducer: {
    todoReducer: todoReducer,
  },
});
