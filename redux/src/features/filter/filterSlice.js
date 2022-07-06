import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    filter: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        postAdded: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const selectSearchPosts = (state) => state.filter;
export const { postAdded } = filterSlice.actions;
export default filterSlice.reducer;
