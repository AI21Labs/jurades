import { createSlice } from '@reduxjs/toolkit'
import {sample} from "underscore";

import CARDS from "../../assets/figure_list";
import {ROUND_DUR, SAMPLE_FACTOR} from "../../const/game";
import {correct, skip, nextTurn, startTurn, startGame} from "../actions";


export const cards = createSlice({
    name: 'cards',
    initialState: {
        all: [],
        current: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(startGame, (state) => {
                state.all = sample(CARDS, ROUND_DUR * SAMPLE_FACTOR);
                state.current = null;
            })
            .addCase(nextTurn, (state) => {
                state.all = sample(CARDS, ROUND_DUR * SAMPLE_FACTOR);
                state.current = null;
            })
            .addCase(startTurn, (state) => {
                state.current = 0;
            })
            .addCase(skip, (state) => {
                state.current += 1;
            })
            .addCase(correct, (state) => {
                state.current += 1;
            })
    }
});


export default cards.reducer;
