from django.db import models
from django.contrib.auth.models import User


class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    month = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.month