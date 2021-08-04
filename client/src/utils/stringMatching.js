import {compareTwoStrings} from "string-similarity";


export function compare(character, guess) {
    let characterNorm = character.toLowerCase().replaceAll(/\([^)]*\)/g, "").trim();
    let guessNorm = guess.toLowerCase().trim()
    return compareTwoStrings(characterNorm, guessNorm) > 0.7;
}