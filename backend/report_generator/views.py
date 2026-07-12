import os

from django.conf import settings
from django.http import FileResponse
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import GeneratedReport
from .serializers import (
    ReportUploadSerializer,
    GeneratedReportSerializer,
)
from .services import ReportService


class ReportUploadView(APIView):

    def post(self, request):

        serializer = ReportUploadSerializer(
            data=request.data
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        uploaded_file = serializer.validated_data["file"]

        upload_folder = os.path.join(
            settings.MEDIA_ROOT,
            "reports",
            "uploads",
        )

        os.makedirs(
            upload_folder,
            exist_ok=True,
        )

        file_path = os.path.join(
            upload_folder,
            uploaded_file.name,
        )

        with open(file_path, "wb+") as destination:

            for chunk in uploaded_file.chunks():

                destination.write(chunk)

        class TempFile:
            pass

        temp = TempFile()

        temp.path = file_path
        temp.name = uploaded_file.name

        service = ReportService(temp)

        report = service.build_report()

        pdf_folder = os.path.join(
            settings.MEDIA_ROOT,
            "reports",
            "pdf",
        )

        word_folder = os.path.join(
            settings.MEDIA_ROOT,
            "reports",
            "docx",
        )

        os.makedirs(
            pdf_folder,
            exist_ok=True,
        )

        os.makedirs(
            word_folder,
            exist_ok=True,
        )

        pdf_path = os.path.join(
            pdf_folder,
            uploaded_file.name + ".pdf",
        )

        docx_path = os.path.join(
            word_folder,
            uploaded_file.name + ".docx",
        )

        service.generate_pdf(
            report,
            pdf_path,
        )

        service.generate_docx(
            report,
            docx_path,
        )

        report_type = (
            "pdf"
            if uploaded_file.name.lower().endswith(".pdf")
            else "excel"
        )

        generated = GeneratedReport.objects.create(

            file=f"reports/uploads/{uploaded_file.name}",

            file_name=uploaded_file.name,

            report_type=report_type,

            rows=report.get(
                "dataset_information",
                {},
            ).get("Rows", 0),

            columns=report.get(
                "dataset_information",
                {},
            ).get("Columns", 0),

            missing_values=report.get(
                "dataset_information",
                {},
            ).get("Missing Values", 0),

            executive_summary=report.get(
                "executive_summary",
                "",
            ),

            insights=report.get(
                "insights",
                [],
            ),

            recommendations=report.get(
                "recommendations",
                [],
            ),

            conclusion=report.get(
                "conclusion",
                "",
            ),
        )

        generated.pdf_report = (
            f"reports/pdf/{uploaded_file.name}.pdf"
        )

        generated.docx_report = (
            f"reports/docx/{uploaded_file.name}.docx"
        )

        generated.save()

        response = GeneratedReportSerializer(
            generated
        )

        return Response(
            response.data,
            status=status.HTTP_201_CREATED,
        )
    # ---------------------------------------------------------
# Report Preview API
# ---------------------------------------------------------

class ReportPreviewView(APIView):

    def get(self, request):

        report = (
            GeneratedReport.objects
            .order_by("-created_at")
            .first()
        )

        if report is None:

            return Response(
                {
                    "message": "No report found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = GeneratedReportSerializer(
            report
        )

        return Response(
            serializer.data
        )


# ---------------------------------------------------------
# Download PDF
# ---------------------------------------------------------

class DownloadPDFView(APIView):

    def get(self, request):

        report = (
            GeneratedReport.objects
            .order_by("-created_at")
            .first()
        )

        if report is None:

            return Response(
                {
                    "message": "No PDF report found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        pdf_path = os.path.join(
            settings.MEDIA_ROOT,
            str(report.pdf_report)
        )

        if not os.path.exists(pdf_path):

            return Response(
                {
                    "message": "PDF file does not exist."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        return FileResponse(
            open(pdf_path, "rb"),
            as_attachment=True,
            filename=os.path.basename(pdf_path),
            content_type="application/pdf",
        )


# ---------------------------------------------------------
# Download DOCX
# ---------------------------------------------------------

class DownloadDOCXView(APIView):

    def get(self, request):

        report = (
            GeneratedReport.objects
            .order_by("-created_at")
            .first()
        )

        if report is None:

            return Response(
                {
                    "message": "No Word report found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        docx_path = os.path.join(
            settings.MEDIA_ROOT,
            str(report.docx_report)
        )

        if not os.path.exists(docx_path):

            return Response(
                {
                    "message": "Word file does not exist."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        return FileResponse(
            open(docx_path, "rb"),
            as_attachment=True,
            filename=os.path.basename(docx_path),
            content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        )