<img width="350" align="right" src="https://user-images.githubusercontent.com/7150767/128235508-b8ec81f5-874d-4496-b6d0-e7bdbf3f7017.png">
<img width="300" alt="Jurades" src="https://user-images.githubusercontent.com/7150767/128235107-903820d0-dbf4-4d73-98d8-64542298b02f.png">

## An AI Charades game, _powered by JURASSIC language model by AI21Labs Studio_


- [Running the game](#running-the-game)
   - [Server](#server)
   - [Client](#client)
- [How to play](#how-to-play)
- [Configuration](#configuration)

# Running the game

The game consist of:
- A server app, which produces the guesses by sending requests to AI21 Studio. This is done from the backend in order to keep the AI21 Studio API key secured.
- A client web app which is the actual game, sending request to the server mentioned above.

## Server

You need to have `python > 3.5` and `pip` to install the dependencies and run the server. 

In order to run the server locally:

1. Enter the server folder
```shell
cd server
```
2. Install the python dependencies using pip
```shell
pip install -r requirements.txt
```
3. Set your AI21 Studio API key as an environment variable.
   _(Replace <YOUR-API-KEY> with the key you generated in AI21 Studio)_
```shell
AI21_API_KEY=<YOUR-API-KEY>
```
4. Start Flask's development server
```shell
python main.py
```
***🎉 The server should be up and running locally on port 5000.***

#### Please note: this method runs Flask's development server, and is not intended for production deployment.
For serving this app in a production environment, please look for instructions on how to server Flask apps. (For example, using Gunicorn, Waitress or any other WSGI server)

## Client

You need to have `node` and `npm` installed for running and building the client app.

First of all, make sure to enter the client app's folder:
```shell
# Return to the repo's parent folder if you were inside the server folder
cd ..
# Enter the client app folder
cd client
```
Install the relevant packages
```shell
npm i
```

### Running the local dev version
Simply run the following inside the client folder
```shell
npm start
```
And the app will be accessible at `http://localhost:3000`

### Building for production
Run
```shell
npm run build
```
A production bundle will be ready in `client/build` folder.

# How to play?

### Start by entering up to 4 players in the welcome screen.

### Now, you will all take turns for 3 rounds.
On each turn, the player has **45 seconds** to describe **as many characters as possible** to the computer.

The player may write/say anything they want, except for what's written on the card.
- If Jurassic guessed correctly, the player gets a point and moves to the next card.
- If not, they may keep trying and add information so Jurassic will get it right. _Don't worry - it remembers what you've said before and what guesses were wrong!_
- At any time the player may skip a card if they don't know the character or fail to describe it to Jurassic.

### After 3 rounds, the winner is the one with the highest score! _(big surprise)_

# Configuration

You can change a few of the game's configuration located in the client's config file.

```javascript
// client/src/const/game.js
export const ROUND_DUR = 45;
export const NUMBER_OF_ROUNDS = 3;
export const SAMPLE_FACTOR = 4;

export const USE_SPEECH = false;

export const SERVER_URL = "http://localhost:5000/";
```
- `ROUND_DUR` Each turn's duration in seconds
- `NUMBER_OF_ROUNDS` The number of rounds in a single game
- `SAMPLE FACTOR` Controls the amount of cards being sampled from the full characters list each turn (`ROUND_DUR * SAMPLE_FACTOR`)
- `USE_SPEECH` If `true`, the player's input is done using speech-to-text instaed of typing.
- `SERVER_URL` The backend service URL

The full list with all the possible characters can be found at `client/src/assets/figure_list.json`. 
