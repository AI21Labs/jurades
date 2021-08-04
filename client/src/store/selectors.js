import {TURN_STATUS} from "../const/game";

export const players = state => state.players.all;
export const numPlayers = state => state.players.all.length;

export const curCard = state => state.cards.all[state.cards.current];

export const isRunning = state => state.players.turnStatus === TURN_STATUS.RUNNING;
export const isReady = state => state.players.turnStatus === TURN_STATUS.READY;
export const curPlayer = state => state.players.currentPlayer;
export const curPlayerName = state => state.players.all[state.players.currentPlayer]?.name;
export const turnScore = state => state.players.currentScore;
export const curRound = state => state.players.round;
export const lastTurn = state => state.players.lastTurn;

export const isFetching = state => state.guesses.isFetching;

export const curGuess = state => state.guesses.guess;
export const fullDescription = state => state.guesses.description;
export const wrongGuesses = state => state.guesses.wrongGuesses;

