from django.urls import path
from .views import (
    FileUploadView,
    GenerateChartView,
    SessionChartsView,
    ChartTypesView,
    register_user,
    login_user,
    add_data,
    get_data,
    upload_file,
    generate_dashboard,
    send_email,
)

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='upload'),

    path(
        'generate-chart/',
        GenerateChartView.as_view(),
        name='generate_chart'
    ),

    path(
        'chart-types/',
        ChartTypesView.as_view(),
        name='chart_types'
    ),

    path(
        'session/<int:session_id>/charts/',
        SessionChartsView.as_view(),
        name='session_charts'
    ),

    path(
        'register/',
        register_user,
        name='register'
    ),

    path(
        'login/',
        login_user,
        name='login'
    ),

    path(
        'upload-file/',
        upload_file,
        name='upload_file'
    ),

    path(
        'add-data/',
        add_data,
        name='add_data'
    ),

    path(
        'get-data/<int:user_id>/',
        get_data,
        name='get_data'
    ),

    path(
        'generate-dashboard/',
        generate_dashboard,
        name='generate_dashboard'
    ),

    path(
        'send-email/',
        send_email,
        name='send_email'
    ),
]
