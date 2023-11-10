
import { createSlice, configureStore } from "@reduxjs/toolkit";


const searchReducer = createSlice({
    name: "search",
    initialState: {list: [], page:1, totalResult:0, haveResult: true, value: ""},
    reducers: {
        setList: (state, action) => {
            state.value = action.payload.value;
            state.list = action.payload.list;
            state.page = action.payload.page;
            state.totalResult = action.payload.totalResult;
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
