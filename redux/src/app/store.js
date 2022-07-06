import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../features/Card/cardsSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
        filter: filterReducer,
    },
});
