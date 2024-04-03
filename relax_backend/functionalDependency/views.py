from rest_framework import viewsets
from rest_framework.response import Response

from functionalDependency.gen import generate_random_fds, identifyCandidateKeys


class FunctionalDependencyViewSet(viewsets.ViewSet):
    def list(self, request):
        level = request.query_params['difficulty']
        while True:
            fds, attributes = generate_random_fds(7, 3)
            candidate_keys, total_cost = identifyCandidateKeys(attributes, fds)

            if level == "easy" and total_cost < 50:
                return Response({"attributes": attributes, "fds": fds, "candidate_keys": candidate_keys})

            if level == "medium" and 50 <= total_cost < 100:
                return Response({"attributes": attributes, "fds": fds, "candidate_keys": candidate_keys})

            if level == "hard" and total_cost > 100:
                return Response({"attributes": attributes, "fds": fds, "candidate_keys": candidate_keys})
