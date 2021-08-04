_prompts_objects = {
    'round_1_famous':
        {'prompt_start': "The following is a set of riddles and answers. The riddle contains a description "
                         "of a famous figure, and a list of incorrect figures. The right answer is the "
                         "name of the figure.",
         'prompt_obj': [
             {'Description:': 'player for the Chicago Bulls',
              'Wrong guesses:': 'Michael Jordan',
              'Answer:': 'Scottie Pippen'},
             {'Description:': 'Painter. Had a crazy long mustache. Spaniard',
              'Wrong guesses:': '',
              'Answer:': 'Salvador Dali'},
             {'Description:': 'A hobbit from lord of the rings',
              'Wrong guesses:': 'Frodo',
              'Answer:': 'Bilbo Baggins'},
             {'Description:': 'Portuguese soccer player',
              'Wrong guesses:': 'Ronaldo',
              'Answer:': 'Luis Figo'},
             {'Description:': 'Evil wizard from Harry Potter',
              'Wrong guesses:': 'Lord Voldemort, Albus Dumbledore',
              'Answer:': 'Severus Snape'},
             {'Description:': 'Was US president, after being a movie start', 'Wrong guesses:': '',
              'Answer:': 'Ronald Reagan'},
             {'Description:': 'Movie with Brad Pitt and George Clooney',
              'Wrong guesses:': '',
              'Answer:': "Ocean's Eleven"}
         ]},
    'round_2_famous':
        {'prompt_start': "The following is a set of riddles and answers. The riddle contains a list of "
                         "people, and a single word, which describes one of them.",
         'prompt_obj': [
             {'List:': 'Obama, Ben Gurion, Einstein, Hitler, Michael Jackson, Michael Jordan, Beyonce, '
                       'Britney Spears, Jay Z, Russel Crow, Michael Phelps, Mark Spitz, Clint Eastwood, '
                       'George Clooney, Brad Pitt, Angelina Joley',
              'Description:': 'Fight Club',
              'Answer:': 'Brad Pitt'},
             {'List:': 'Obama, Ben Gurion, Einstein, Hitler, Michael Jackson, Michael Jordan, Beyonce, '
                       'Britney Spears, Jay Z, Russel Crow, Michael Phelps, Mark Spitz, Clint Eastwood, '
                       'George Clooney, Brad Pitt, Angelina Joley',
              'Description:': 'Israel',
              'Answer:': 'Ben Gurion'},
             {'List:': 'Obama, Ben Gurion, Einstein, Hitler, Michael Jackson, Michael Jordan, Beyonce, '
                       'Britney Spears, Jay Z, Russel Crow, Michael Phelps, Mark Spitz, Clint Eastwood, '
                       'George Clooney, Brad Pitt, Angelina Joley',
              'Description:': 'Austria',
              'Answer:': 'Hitler'},
             {'List:': 'Obama, Ben Gurion, Einstein, Hitler, Michael Jackson, Michael Jordan, Beyonce, '
                       'Britney Spears, Jay Z, Russel Crow, Michael Phelps, Mark Spitz, Clint Eastwood, '
                       'George Clooney, Brad Pitt, Angelina Joley',
              'Description:': 'Physics',
              'Answer:': 'Einstein'},
             {'List:': 'Obama, Ben Gurion, Einstein, Hitler, Michael Jackson, Michael Jordan, Beyonce, '
                       'Britney Spears, Jay Z, Russel Crow, Michael Phelps, Mark Spitz, Clint Eastwood, '
                       'George Clooney, Brad Pitt, Angelina Joley',
              'Description:': 'Gladiator',
              'Answer:': 'Russel Crow'}
         ]},
}

prompts_dict = {}
for round_type, v in _prompts_objects.items():
    prompt_start = v['prompt_start']
    prompt_obj = v['prompt_obj']
    prompt = prompt_start + "\n\n"
    for example in prompt_obj:
        prompt += "###\n"
        for content in example:
            prompt += content + " " + example[content] + "\n"
        prompt += "\n"
    prompt += "###\n"

    prompts_dict[round_type] = prompt

