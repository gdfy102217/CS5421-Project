import random

def generate_random_fds(n, k):
    # Create a list of attributes
    attributes = ['A{}'.format(i) for i in range(1, n + 1)]
    fds = set()
    count = 0

    while count < k:
        
        lhs = [attribute for attribute in attributes if random.choice([True, False])]
        rhs = [attribute for attribute in attributes if random.choice([True, False])]
        
        # Convert to frozensets for immutability and to be used as set elements
        lhs = frozenset(lhs)
        rhs = frozenset(rhs)
        
        if lhs and lhs != rhs:
            fd = (lhs, rhs)
            
            if fd not in fds:
                fds.add(fd)
                count += 1

    return fds

# Parameters: n is the number of attributes, k is the number of FDs to generate
# For example, for a relation with 5 attributes and 3 FDs
generated_fds = generate_random_fds(5, 3)
generated_fds
