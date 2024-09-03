import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string,
    createDrawerVisibility: boolean,
    checkTicketCreateUpdate: boolean
}
const initialState: UserState = {
    username: '',
    createDrawerVisibility: false,
    checkTicketCreateUpdate: false
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
        },
        setCheckTicketCreateUpdate: (state, action: PayloadAction<UserState["checkTicketCreateUpdate"]>) => {
            state.checkTicketCreateUpdate = action.payload
        }
    }
})

export const { setUsername, setCreateDrawerVisibility, setCheckTicketCreateUpdate } = usernameSlice.actions;

export default usernameSlice.reducer;