from django.db import models


class Relation(models.Model):
    name = models.CharField(max_length=100)


class Attribute(models.Model):
    name = models.CharField(max_length=100)
    relation = models.ForeignKey(Relation, on_delete=models.CASCADE)


class FunctionalDependency(models.Model):
    lhs = models.ManyToManyField(Attribute, related_name='lhs')
    rhs = models.ManyToManyField(Attribute, related_name='rhs')
    relation = models.ForeignKey(Relation, on_delete=models.CASCADE)
