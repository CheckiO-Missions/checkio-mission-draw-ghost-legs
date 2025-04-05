"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""
from random import sample


def make_random_tests(*ns):
    for n in ns:
        inp = sample(range(1, n+1), k=n)
        yield {'input': [inp],
               'answer': [inp]}


TESTS = {
    "Basics": [
        {
            "input": [[3, 2, 1]],
            "answer": [[3, 2, 1]],
        },
        {
            "input": [[3, 2, 4, 1]],
            "answer": [[3, 2, 4, 1]],
        },
        {
            "input": [[1, 5, 4, 2, 3]],
            "answer": [[1, 5, 4, 2, 3]],
        },
        {
            "input": [[2, 3, 4, 5, 6, 1]],
            "answer": [[2, 3, 4, 5, 6, 1]],
        },
    ],
    "Randoms": list(make_random_tests(3, 4, 5, 6, 7, 8, 9, 10)),
}
