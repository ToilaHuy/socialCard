import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cardsApi from '../api/cardsApi';

const initialState = {
    cards: [],
};

export const fetchCards = createAsyncThunk('cards/fetchCard', async () => {
    const dataApi = await cardsApi.getAll();
    return dataApi;
});
export const fetchDetailsCards = createAsyncThunk('cards/fetchDetailsCard', async (id) => {
    const dataApi = await cardsApi.get(id);
    return dataApi;
});
export const addCard = createAsyncThunk('cards/addCard', async (value) => {
    const dataApi = await cardsApi.addCard(value);
    return dataApi;
});
export const destroyCard = createAsyncThunk('cards/destroyCard', async (initialCard) => {
    await cardsApi.destroyCard(initialCard);
    return initialCard;
});
export const editCard = createAsyncThunk('cards/editCard', async (value) => {
    const id = {
        id: value.id,
    };
    const dataApi = await cardsApi.updateCard(id.id, value);
    return dataApi;
});
export const deleteCard = createAsyncThunk('cards/deleteCard', async (id) => {
    await cardsApi.deleteCard(id);
    return id;
});
export const revertUndo = createAsyncThunk('social/revertUndo', async (id) => {
    await cardsApi.restoreCard(id);
    return id;
});

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        // cardAdded: {
        //     reducer(state, action) {
        //         state.posts.push(action.payload);
        //     },
        //     prepare(avatar, name, image, description) {
        //         return {
        //             payload: {
        //                 avatar,
        //                 name,
        //                 image,
        //                 description,
        //             },
        //         };
        //     },
        // },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cards = action.payload;
            })
            .addCase(fetchDetailsCards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cards = action.payload;
            })
            .addCase(addCard.fulfilled, (state, action) => {
                action.payload.id = state.cards[state.cards.length - 1]._id + 1;
                state.cards.push(action.payload.newCard);
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                const id = action.payload;
                const cards = state.cards.filter((card) => card._id !== id);
                state.cards = cards;
            })
            .addCase(destroyCard.fulfilled, (state, action) => {
                const id = action.payload;
                const cards = state.cards.filter((card) => card._id !== id);
                state.cards = cards;
            })
            .addCase(editCard.fulfilled, (state, action) => {
                const id = action.payload._id;
                const cards = state.cards.filter((card) => card._id !== id);
                state.cards = [...cards, action.payload];
            })

            .addCase(revertUndo.fulfilled, (state, action) => {
                state.cards = action.payload;
            });
    },
});

export const selectAllCards = (state) => state.cards.cards;

export const { cardAdded } = cardsSlice.actions;
export default cardsSlice.reducer;
