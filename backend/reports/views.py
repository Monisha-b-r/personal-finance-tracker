from django.http import HttpResponse
from reportlab.pdfgen import canvas

def export_pdf(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="report.pdf"'

    p = canvas.Canvas(response)

    p.drawString(100, 800, "Personal Finance Report")

    p.drawString(100, 780, "Generated Successfully")

    p.save()

    return response