from rest_framework import serializers
from .models import Relation, Attribute, FunctionalDependency


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = '__all__'


class RelationSerializer(serializers.ModelSerializer):
    attributes = AttributeSerializer(many=True, read_only=True)

    class Meta:
        model = Relation
        fields = '__all__'


class FunctionalDependencySerializer(serializers.ModelSerializer):
    class Meta:
        model = FunctionalDependency
        fields = '__all__'
