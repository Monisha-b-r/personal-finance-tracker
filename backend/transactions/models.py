from django.db import models
from django.contrib.auth.models import User


class Transaction(models.Model):

    TRANSACTION_TYPE = [
        ('Income', 'Income'),
        ('Expense', 'Expense'),
    ]

    CATEGORY = [
        ('Salary', 'Salary'),
        ('Food', 'Food'),
        ('Shopping', 'Shopping'),
        ('Travel', 'Travel'),
        ('Bills', 'Bills'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=100)

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_TYPE
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY
    )

    description = models.TextField(
        blank=True
    )

    date = models.DateField(
        auto_now_add=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title