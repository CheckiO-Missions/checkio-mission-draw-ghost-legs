from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io_template import CheckiOReferee
# from checkio.referees.checkers import to_list

from tests import TESTS

Leg = tuple[int, int]


def checker(inp: list[list[int]], legs: list[Leg]) -> tuple[bool, tuple[list[Leg], str]]:
    try:
        result = inp[0]
        test_result = [i for i in sorted(result)]
        for a, b in legs:
            test_result[a - 1], test_result[b - 1] = test_result[b - 1], test_result[a - 1]
        if test_result == result:
            return True, (legs, 'success')
        else:
            return False, (legs, 'fail')
    except Exception:
        return False, (legs, 'fail')


api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        checker=checker,
        function_name={
            "python": "draw_ghost_legs",
            "js": "drawGhostLegs"
        },
        cover_code={
            'python-3': {},
            'js-node': {
                # "dateForZeros": True,
            }
        }
    ).on_ready)
