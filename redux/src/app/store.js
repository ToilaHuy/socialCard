import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../features/Card/cardsSlice';
import filterReducer from '../features/filter/filterSlice';
import revertReducer from '../features/revert/revertSlice';
export const store = configureStore({
    reducer: {
        cards: cardsReducer,
        filter: filterReducer,
        revert: revertReducer,
    },
});
