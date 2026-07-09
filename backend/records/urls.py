from django.urls import path
from . import views

urlpatterns = [

    path(
        "records/",
        views.list_records,
    ),

    path(
        "records/bulk_create/",
        views.bulk_create_records,
    ),

    path(
        "records/export_excel/",
        views.export_excel,
    ),

    path(
        "records/import_excel/",
        views.import_excel,
    ),
path(
    "records/<int:pk>/",
    views.update_record,
),
]