import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string,
    createDrawerVisibility: boolean
}
const initialState: UserState = {
    username: '',
    createDrawerVisibility: false,
}
const usernameSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<UserState["username"]>) => {
            state.username = action.payload
        },
        setCreateDrawerVisibility: (state, action: PayloadAction<UserState["createDrawerVisibility"]>) => {
            state.createDrawerVisibility = action.payload
        }
    }
})

export const { setUsername, setCreateDrawerVisibility } = usernameSlice.actions;

export default usernameSlice.reducer;