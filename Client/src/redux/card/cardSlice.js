import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cards: [],
};


const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setCards: (state, action) => {
            state.cards = action.payload;
        },
    },
});

export const { setCards } = cardSlice.actions;

export default cardSlice.reducer;