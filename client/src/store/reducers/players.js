import { createSlice } from '@reduxjs/toolkit'
import {NUMBER_OF_ROUNDS, TURN_STATUS} from "../../const/game";
import {correct, nextTurn, runTimer, startGame, startTurn} from "../actions";

export const players = createSlice({
    name: 'players',
    initialState: {
        all: [],
        currentPlayer: 0,
        currentScore: 0,
        round: 0,
        lastTurn: false,
        turnStatus: TURN_STATUS.READY
    },
    reducers: {
        newPlayer: (state, action) => {
            state.all.push({score: 0, name: action.payload});
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(runTimer.fulfilled, (state) => {
                state.turnStatus = TURN_STATUS.DONE;
                state.all[state.currentPlayer].score += state.currentScore;
            })
            .addCase(startTurn, (state) => {
                state.turnStatus = TURN_STATUS.RUNNING;
            })
            .addCase(correct, (state) => {
                state.currentScore += 1;
            })
            .addCase(startGame, (state) => {
                state.player = 0;
                state.score = 0;
                state.round = 0;
                state.lastTurn = false;
                state.all.forEach(x => x.score = 0);
                state.turnStatus = TURN_STATUS.READY;
            })
            .addCase(nextTurn, (state) => {
                state.turnStatus = TURN_STATUS.READY;
                state.currentPlayer = (state.currentPlayer + 1) % state.all.length;
                if (state.currentPlayer === 0) {
                    state.round += 1;
                }
                state.currentScore = 0;
                if (state.round === NUMBER_OF_ROUNDS - 1 && state.currentPlayer === state.all.length - 1) {
                    state.lastTurn = true;
                }
            })
    }
});

export const { newPlayer } = players.actions;

export default players.reducer;
