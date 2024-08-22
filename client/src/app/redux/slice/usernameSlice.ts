import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string
}
const initialState: UserState = {
    username: ''
}
const usernameSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        }
    }
})

export const { setUsername } = usernameSlice.actions;

export default usernameSlice.reducer;