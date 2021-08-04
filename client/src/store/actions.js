import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {sendToServer} from "../utils/server";
import {fullDescription, wrongGuesses} from "./selectors";


export const startGame = createAction("game/start");
export const endGame = createAction("game/end");

export const startTurn = createAction("turn/start");
export const nextTurn = createAction("turn/next");
export const runTimer = createAsyncThunk(
    'turn/runTimer',
    async (payload, thunkAPI) => {
        await new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, payload)
        });
        return true
    }
);


export const skip = createAction("card/skip");


export const correct = createAction("guess/correct");
export const wrong = createAction("guess/wrong");
export const pushDescription = createAction("guess/pushDescription");
export const describe = createAsyncThunk(
    'guess/describe',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(pushDescription(payload));
        const newState = thunkAPI.getState();
        return await sendToServer(fullDescription(newState),wrongGuesses(newState));
    }
);


