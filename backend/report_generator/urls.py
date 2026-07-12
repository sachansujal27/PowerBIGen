from django.urls import path

from .views import (
    ReportUploadView,
    ReportPreviewView,
    DownloadPDFView,
    DownloadDOCXView,
)

urlpatterns = [
    path("upload/", ReportUploadView.as_view(), name="report-upload"),
    path("preview/", ReportPreviewView.as_view(), name="report-preview"),
    path("pdf/", DownloadPDFView.as_view(), name="download-pdf"),
    path("docx/", DownloadDOCXView.as_view(), name="download-docx"),
]