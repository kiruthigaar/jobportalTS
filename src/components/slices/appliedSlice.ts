import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface AppliedState {
    items: string[];
}

const initialState: AppliedState = {
    items: [],
};

const AppliedSlice = createSlice({
    name : "applied",
    initialState,
    reducers : {
       appliedForm(state , action: PayloadAction<string>){
        state.items.push(action.payload)
       }
    }
})
export const {appliedForm} = AppliedSlice.actions
export default AppliedSlice.reducer