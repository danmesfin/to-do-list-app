import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './task/taskSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
});

export default store;
