import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './task/taskSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
