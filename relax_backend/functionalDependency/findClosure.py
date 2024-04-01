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
    print(fd_rhs, cost, closure)
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
                            print(left, right, closure, fd_rhs)
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

F = [
    ({'A'}, {'B'}),
    ({'A'}, {'C'}),
    ({'B', 'C'}, {'D'}),
    ({'D', 'E'}, {'F'}),
]
F1 = [
    ({'C'}, {'D'}),
    ({'A', 'D'}, {'E'}),
    ({'B', 'C'}, {'E'}),
    ({'E'}, {'A'}),
    ({'D'}, {'B'}),
]

closure, cost = manual_closure_with_cost({'A', 'E'}, F)
print(closure, cost)