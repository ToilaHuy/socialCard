import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    revert: [],
};

const revertSlice = createSlice({
    name: 'revert',
    initialState,
    reducers: {
        addRevert: (state, action) => {
            state.revert.unshift(action.payload);
        },
        removeRevert: (state, action) => {
            state.revert.shift()
        }
    },
});

export const selectRevert = (state) => state.revert.revert;
export const { addRevert, removeRevert } = revertSlice.actions;
export default revertSlice.reducer;
