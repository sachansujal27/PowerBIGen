from rest_framework import serializers
from .models import GeneratedReport


class ReportUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

    def validate_file(self, value):
        allowed_extensions = [
            ".xlsx",
            ".xls",
            ".csv",
            ".pdf",
        ]

        filename = value.name.lower()

        if not any(filename.endswith(ext) for ext in allowed_extensions):
            raise serializers.ValidationError(
                "Only Excel (.xlsx, .xls, .csv) and PDF (.pdf) files are allowed."
            )

        return value


class GeneratedReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedReport
        fields = [
            "id",
            "file_name",
            "report_type",
            "rows",
            "columns",
            "missing_values",
            "executive_summary",
            "insights",
            "recommendations",
            "conclusion",
            "pdf_report",
            "docx_report",
            "created_at",
        ]