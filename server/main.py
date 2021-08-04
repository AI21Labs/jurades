import os
import requests
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS

from prompts import prompts_dict

API_URL = os.getenv("API_URL", "https://api.ai21.com/studio/v1/complete")
# Set the ENV var with your AI21 Studio API key:
API_KEY = os.getenv("AI21_API_KEY")


def _japi_request(prompt, model="j1-large", num_results=1, max_tokens=100, stopSequences=[],
                  temperature=0.8, topP=1.0, topKReturn=5):
    """
    Helper function to send request to AI21 Studio
    :return: the JSON response from the API
    """
    res = requests.post(API_URL,
                        headers={"Authorization": f"Bearer {API_KEY}"},
                        json={
                            "model": model,
                            "prompt": prompt,
                            "numResults": num_results,
                            "maxTokens": max_tokens,
                            "stopSequences": stopSequences,
                            "temperature": temperature,
                            "topP": topP,
                            "topKReturn": topKReturn
                        })

    assert res.status_code == 200, res.json()
    return res.json()


def create_app():
    app = Flask(__name__)
    CORS(app)

    logging.info("Setting up model...")

    @app.route("/", methods=["POST"])
    def generation():
        description = request.json['description']
        wrong_guesses = request.json.get('wrong_guesses', [])
        round_type = request.json.get('round_type', 'round_1_famous')
        previous_round_characters = request.json.get('previous_round_characters', [])

        # build the prompt
        text = prompts_dict[round_type]
        if round_type == 'round_1_famous':
            text += f'Description: {description}\nWrong guesses:{", ".join(wrong_guesses)}\nAnswer:'
        elif round_type == 'round_2_famous':
            text += f'List: {previous_round_characters}\nDescription: {description}\nAnswer:'

        # get generation from the model
        res = _japi_request(text, max_tokens=8, temperature=0.2, stopSequences=['\n'], topKReturn=5)
        top_1_answer = res['completions'][0]['data']['text']
        resp = {'guess': top_1_answer}

        return jsonify(resp)

    return app


if __name__ == '__main__':
    # Running in dev mode:
    create_app().run(port=5000, debug=True)
