import {SERVER_URL} from "../const/game";

export function sendToServer(fullDescription=[], wrongGuesses = []) {
    return fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description: fullDescription.join("\n"),
            wrong_guesses: wrongGuesses
        })
    }).then(response => response.json())
}
