from rest_framework import viewsets
from rest_framework.response import Response

from functionalDependency.gen import generate_random_fds, identifyCandidateKeys
import random


class FunctionalDependencyViewSet(viewsets.ViewSet):
    def list(self, request):
        level = request.query_params['difficulty']
        while True:
            n = random.randint(3, 8)
            k = random.randint(2, 15)
            fds, attributes = generate_random_fds(n, k)
            candidate_keys, total_cost = identifyCandidateKeys(attributes, fds)

            if level == "easy" and total_cost < 40:
                return Response({"attributes": attributes, "fds": fds, "candidate_keys": candidate_keys})

            if level == "medium" and 40 <= total_cost < 80:
                return Response({"attributes": attributes, "fds": fds, "candidate_keys": candidate_keys})

            if level == "hard" and total_cost > 80:
                return Response({"attributes": attributes, "fds": fds, "candidate_keys": candidate_keys})
