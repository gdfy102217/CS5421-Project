import random
import string
import time
from collections import defaultdict
from itertools import chain, combinations
import matplotlib.pyplot as plt


def generate_random_fds(n, k):
    # Create a list of attributes
    # attributes = ['A{}'.format(i) for i in range(1, n + 1)]
    attributes = list(string.ascii_uppercase)[:n]
    fds = set()
    count = 0

    while count < k:

        lhs = [attribute for attribute in attributes if random.choice([True, False])]
        rhs = [attribute for attribute in attributes if random.choice([True, False])]

        # Convert to frozensets for immutability and to be used as set elements
        lhs = frozenset(lhs)
        rhs = frozenset(rhs)

        if lhs and rhs and lhs != rhs:
            fd = (lhs, rhs)

            if fd not in fds:
                fds.add(fd)
                count += 1

    return fds, attributes


def manual_closure_with_cost(X, F):
    closure = set(X)
    cost = 0
    fd_rhs = set()
    for left, right in F:
        fd_rhs.add(tuple(right))
        for left, right in F:
            if left.issubset(X):
                added = False
                for attr in right:
                    if attr not in closure:
                        added = True
                        closure.add(attr)
                if added:
                    cost += 1
    prev_closure = set()
    while prev_closure != closure:
        prev_closure = closure.copy()
        for attr_set in powerset(closure):
            for left, right in F:
                if left.issubset(attr_set):
                    added = False
                    for attr in right:
                        if attr not in closure:
                            added = True
                            closure.add(attr)
                    if added:
                        cost += 1
                        if tuple(left) not in fd_rhs:
                            fd_rhs.add(tuple(left))
                            cost += 1
    return closure, cost


def powerset(iterable):
    def powerset_helper(s, idx):
        if idx == len(s):
            yield frozenset()
        else:
            for subset in powerset_helper(s, idx + 1):
                yield subset
                yield subset | {s[idx]}

    return powerset_helper(list(iterable), 0)


def subsets(attributes):
    return map(set, chain.from_iterable(combinations(attributes, r) for r in range(1, len(attributes) + 1)))


def identifyCandidateKeys(attributes, fds):
    candidate_keys = []
    total_cost = 0

    for subset in subsets(attributes):
        if any(key.issubset(subset) for key in candidate_keys):
            continue
        closure, cost = manual_closure_with_cost(subset, fds)
        total_cost += cost

        if closure == set(attributes):
            candidate_keys.append(subset)

    return candidate_keys, total_cost


def main():
    # print("Functional Dependencies: ", fds)
    # print("Attributes: ", attributes)

    # print("Candidate Keys:", candidate_keys)
    # print("Total Cost:", total_cost)
    start = time.time()
    difficulty_stats = defaultdict(int)
    for i in range(1000):
        fds, attributes = generate_random_fds(8, 3)

        candidate_keys, total_cost = identifyCandidateKeys(attributes, fds)

        difficulty_stats[total_cost] += 1
        if total_cost > 100:
            print("Functional Dependencies: ", fds)
            print("Attributes: ", attributes)

            print("Candidate Keys:", candidate_keys)
            print("Total Cost:", total_cost)

    sorted_stats = dict(sorted(difficulty_stats.items()))
    end = time.time()
    print(end - start)
    # print(difficulty_stats)
    difficulty_levels = list(sorted_stats.keys())
    num_questions = list(sorted_stats.values())

    # Plotting
    plt.bar(difficulty_levels, num_questions, color='skyblue')
    plt.xlabel('Difficulty')
    plt.ylabel('Number of Questions')
    plt.title('Difficulty Distribution of Questions')
    plt.xticks(difficulty_levels)
    plt.show()


if __name__ == "__main__":
    main()
