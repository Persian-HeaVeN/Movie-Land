
import { createSlice, configureStore } from "@reduxjs/toolkit";


const searchReducer = createSlice({
    name: "search",
    initialState: {list: [], haveResult: true},
    reducers: {
        setList: (state, action) => {
            state.list = action.payload.list;
        },
        clearList: (state, action) => {
            state.list = [];
        },
        setResult: (state, action) => {
            state.haveResult = action.payload.result;
        },
    }
})


export const {setList, clearList, setResult} = searchReducer.actions;


export const store = configureStore({reducer: {
    search: searchReducer.reducer,
}})
