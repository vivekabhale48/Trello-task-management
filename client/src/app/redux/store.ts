import { configureStore } from "@reduxjs/toolkit";
import usernameSlice from './slice/usernameSlice'
import taskStateSlice from "./slice/taskState.slice";

const store = configureStore({
    reducer: {
        user: usernameSlice,
        taskSlice: taskStateSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;