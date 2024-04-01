from rest_framework import viewsets
from .models import Relation, FunctionalDependency
from .serializers import RelationSerializer, FunctionalDependencySerializer


class RelationViewSet(viewsets.ModelViewSet):
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer


class FunctionalDependencyViewSet(viewsets.ModelViewSet):
    queryset = FunctionalDependency.objects.all()
    serializer_class = FunctionalDependencySerializer
