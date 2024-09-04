import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FormState {
    createdForm: {
        title: string,
        status: "todo" | "under review" | "in progress" | "finished" | "",
        priority: "low" | "medium" | "high" | "urgent" | "",
        deadline?: Date | undefined,
        description: string
    },
    editId: string | null
}
const initialState: FormState = {
    createdForm: {
        title: '',
        status: '',
        priority: '',
        deadline: undefined,
        description: ''
    },
    editId: null
}

const taskStateSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<FormState["createdForm"]["title"]>) => {
            state.createdForm.title = action.payload
        },
        setStatus: (state, action: PayloadAction<FormState["createdForm"]["status"]>) => {
            state.createdForm.status = action.payload
        },
        setPriority: (state, action: PayloadAction<FormState["createdForm"]["priority"]>) => {
            state.createdForm.priority = action.payload
        },
        setDeadline:(state, action: PayloadAction<FormState["createdForm"]["deadline"]>) => {
            state.createdForm.deadline = action.payload
        },
        setDescription: (state, action: PayloadAction<FormState["createdForm"]["description"]>) => {
            state.createdForm.description = action.payload
        },
        setEditId: (state, action: PayloadAction<FormState["editId"]>) => {
            state.editId = action.payload;
        }
    }
})

export const {setTitle, setStatus, setPriority, setDeadline, setDescription, setEditId} = taskStateSlice.actions;
export default taskStateSlice.reducer;