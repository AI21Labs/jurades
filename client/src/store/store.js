import { configureStore } from '@reduxjs/toolkit'
import players from "./reducers/players";
import cards from "./reducers/cards";
import guesses from "./reducers/guesses";

export default configureStore({
    reducer: {
        players,
        cards,
        guesses
    },
})
