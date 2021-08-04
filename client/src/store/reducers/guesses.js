import {createSlice} from '@reduxjs/toolkit'
import {describe, pushDescription, wrong} from "../actions";

function isNewCard(action) {
    return ['card/skip','guess/correct','turn/next', 'turn/runTimer/fulfilled'].includes(action.type );
}

export const guesses = createSlice({
    name: 'turn',
    initialState: {
        description: [],
        wrongGuesses: [],
        guess: null,
        isFetching: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(pushDescription, (state, action) => {
                state.description.push(action.payload);
            })
            .addCase(describe.pending, (state) => {
                state.isFetching = true;
                state.guess = null;
            })
            .addCase(describe.fulfilled, (state, action) => {
                state.isFetching = false;
                state.guess = action.payload.guess;
            })
            .addCase(wrong, (state) => {
                state.wrongGuesses.push(state.guess);
                state.isFetching = false;
            })
            .addMatcher(isNewCard, (state) => {
                state.description = [];
                state.wrongGuesses = [];
                state.guess = null;
                state.isFetching = false;
            })
    }
});


export default guesses.reducer;
