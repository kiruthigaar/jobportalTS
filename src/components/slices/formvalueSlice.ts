import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormValueItem {
  First_name: string;
  Last_name: string;
  email: string;
  option: string[];
  content: string;
}

interface FormValueState {
  items: FormValueItem[]
  content?: string;
}

const initialState: FormValueState = {
  items: [],
  content: '',
};

const formValueSlice = createSlice({
  name: "formvalue",
  initialState,
  reducers: {
    setFormValues(state, action: PayloadAction<FormValueItem[]>) {
      state.items = action.payload; 
    },
    richTextValue(state , action: PayloadAction<string>){
        state.content = action.payload
       },
  },
});

export const { setFormValues, richTextValue } = formValueSlice.actions;
export default formValueSlice.reducer;
