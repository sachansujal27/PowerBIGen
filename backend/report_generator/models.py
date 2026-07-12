from django.db import models


class GeneratedReport(models.Model):
    REPORT_TYPES = [
        ("excel", "Excel"),
        ("pdf", "PDF"),
    ]

    file = models.FileField(upload_to="reports/uploads/")
    file_name = models.CharField(max_length=255)

    report_type = models.CharField(
        max_length=20,
        choices=REPORT_TYPES,
    )

    rows = models.IntegerField(default=0)
    columns = models.IntegerField(default=0)
    missing_values = models.IntegerField(default=0)

    executive_summary = models.TextField(blank=True)
    insights = models.JSONField(default=list, blank=True)
    recommendations = models.JSONField(default=list, blank=True)
    conclusion = models.TextField(blank=True)

    pdf_report = models.FileField(
        upload_to="reports/pdf/",
        blank=True,
        null=True,
    )

    docx_report = models.FileField(
        upload_to="reports/docx/",
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.file_name