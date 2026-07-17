from django.db.models import Sum

from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Transaction
from .serializers import TransactionSerializer


class TransactionViewSet(viewsets.ModelViewSet):

    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):

    income = (
        Transaction.objects.filter(
            user=request.user,
            transaction_type="Income"
        ).aggregate(total=Sum("amount"))["total"] or 0
    )

    expense = (
        Transaction.objects.filter(
            user=request.user,
            transaction_type="Expense"
        ).aggregate(total=Sum("amount"))["total"] or 0
    )

    return Response({
        "income": income,
        "expense": expense,
        "balance": income - expense
    })