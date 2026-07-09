import json
import pandas as pd

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
    JSONParser
)

from django.contrib.auth.hashers import (
    make_password,
    check_password
)

from .models import (
    UploadedFile,
    DataSession,
    GeneratedChart,
    User,
    BusinessData
)

from .serializers import (
    UploadedFileSerializer,
    DataSessionSerializer,
    GeneratedChartSerializer,
    BusinessDataSerializer
)

from .utils.file_parser import (
    parse_file,
    dataframe_to_session_data
)

from .utils.chart_engine import generate_chart
from .utils.template_detector import detect_dashboard_type

from services.data_processor import DataProcessor
from services.dashboard_builder import DashboardBuilder
from services.insight_generator import InsightGenerator
from django.http import JsonResponse
from django.http import JsonResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
import json


@csrf_exempt
def send_email(request):
    try:
        if request.method != "POST":
            return JsonResponse(
                {"error": "Only POST method allowed"},
                status=405
            )

        data = json.loads(request.body)

        name = data.get("name", "")
        email = data.get("email", "")
        subject = data.get("subject", "Support Request")
        message = data.get("message", "")

        company_email = "sachansujal27@gmail.com"

        email_body = f"""
AUREX BI SUPPORT TICKET

User Name: {name}
User Email: {email}

Subject:
{subject}

Issue Details:
{message}
"""

        print("=== SUPPORT REQUEST RECEIVED ===")
        print("NAME:", name)
        print("EMAIL:", email)

        # Send to company
        result1 = send_mail(
            subject=f"New Support Ticket - {subject}",
            message=email_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[company_email],
            fail_silently=False,
        )

        print("COMPANY EMAIL RESULT =", result1)

        # Send confirmation to user
        result2 = send_mail(
            subject="Support Request Received - Aurex BI",
            message=f"""
Hello {name},

Thank you for contacting Aurex BI Support.

We have received your support request.

Regards,
Aurex BI Team
""",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )

        print("USER EMAIL RESULT =", result2)

        return JsonResponse({
            "success": True,
            "message": "Support request submitted successfully."
        })

    except Exception as e:
        import traceback
        traceback.print_exc()

        return JsonResponse(
            {
                "success": False,
                "error": str(e)
            },
            status=500
        )
    
    # --------------------SMS-----------------------------------
  

# ==========================================================
# Helper: Detect file type
# ==========================================================

def _detect_type(filename: str) -> str:

    ext = filename.rsplit(".", 1)[-1].lower()

    if ext == "csv":
        return "csv"

    if ext in ("xlsx", "xls"):
        return "excel"

    if ext == "pdf":
        return "pdf"

    raise ValueError(f"Unsupported extension: .{ext}")


# ==========================================================
# FILE UPLOAD API (PROJECT 1)
# ==========================================================

class FileUploadView(APIView):

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):

        file_obj = request.FILES.get("file")

        if not file_obj:
            return Response(
                {"error": "No file provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            file_type = _detect_type(file_obj.name)

        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            df = parse_file(file_obj, file_type)

        except Exception as e:
            return Response(
                {"error": f"Parse error: {str(e)}"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        meta = dataframe_to_session_data(df)

        template_type = detect_dashboard_type(
            meta["columns"]
        )

        file_obj.seek(0)

        uploaded = UploadedFile.objects.create(
            name=file_obj.name,
            file_type=file_type,
            file=file_obj,
            row_count=meta["rows"],
            col_count=meta["cols"]
        )

        session = DataSession.objects.create(
            uploaded_file=uploaded,
            columns_json=json.dumps(meta["columns"]),
            dtypes_json=json.dumps(meta["dtypes"]),
            preview_json=json.dumps(meta["preview"])
        )

        return Response(
            {
                "session_id": session.id,
                "file_id": uploaded.id,
                "filename": uploaded.name,
                "rows": meta["rows"],
                "cols": meta["cols"],
                "columns": meta["columns"],
                "dtypes": meta["dtypes"],
                "preview": meta["preview"],
                "recommended_template": template_type
            },
            status=status.HTTP_201_CREATED
        )


# ==========================================================
# GENERATE CHART API
# ==========================================================

class GenerateChartView(APIView):

    parser_classes = [JSONParser]

    def post(self, request):

        data = request.data

        session_id = data.get("session_id")
        chart_type = data.get("chart_type", "bar")
        x_col = data.get("x_axis", "")
        y_col = data.get("y_axis", "")
        title = data.get(
            "title",
            f"{chart_type.title()} Chart"
        )

        if not session_id:
            return Response(
                {"error": "session_id required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            session = DataSession.objects.get(
                id=session_id
            )

        except DataSession.DoesNotExist:
            return Response(
                {"error": "Session not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        file_record = session.uploaded_file

        try:
            df = parse_file(
                file_record.file,
                file_record.file_type
            )

        except Exception as e:
            return Response(
                {
                    "error":
                    f"Could not reload data: {str(e)}"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        cols = list(df.columns)

        if x_col and x_col not in cols:
            return Response(
                {"error": f'Column "{x_col}" not found'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if y_col and y_col not in cols:
            return Response(
                {"error": f'Column "{y_col}" not found'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            img_file = generate_chart(
                df,
                chart_type,
                x_col,
                y_col,
                title
            )

        except Exception as e:
            return Response(
                {
                    "error":
                    f"Chart error: {str(e)}"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        chart = GeneratedChart(
            session=session,
            chart_type=chart_type,
            x_axis=x_col,
            y_axis=y_col,
            title=title
        )

        chart.image.save(
            img_file.name,
            img_file,
            save=True
        )

        serializer = GeneratedChartSerializer(
            chart,
            context={"request": request}
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


# ==========================================================
# SESSION CHARTS API
# ==========================================================

class SessionChartsView(APIView):

    def get(self, request, session_id):

        charts = GeneratedChart.objects.filter(
            session_id=session_id
        ).order_by("-created_at")

        serializer = GeneratedChartSerializer(
            charts,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)


# ==========================================================
# CHART TYPES API
# ==========================================================

class ChartTypesView(APIView):

    CHART_TYPES = [
        {"type": "bar", "label": "Bar Chart", "icon": "📊", "needs_y": True},
        {"type": "line", "label": "Line Chart", "icon": "📈", "needs_y": True},
        {"type": "pie", "label": "Pie Chart", "icon": "🥧", "needs_y": True},
        {"type": "scatter", "label": "Scatter Plot", "icon": "⚡", "needs_y": True},
        {"type": "histogram", "label": "Histogram", "icon": "🔢", "needs_y": False},
        {"type": "heatmap", "label": "Heatmap", "icon": "🌡️", "needs_y": False},
        {"type": "area", "label": "Area Chart", "icon": "🏔️", "needs_y": True},
        {"type": "box", "label": "Box Plot", "icon": "📦", "needs_y": True},
    ]

    def get(self, request):
        return Response(self.CHART_TYPES)


# ==========================================================
# REGISTER USER
# ==========================================================

@api_view(["POST"])
def register_user(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response(
            {"error": "All fields are required"},
            status=400
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=400
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already exists"},
            status=400
        )

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password)
    )

    return Response(
        {
            "message": "Registration Successful",
            "userId": user.id,
        },
        status=201,
    )

# ==========================================================
# LOGIN USER
# ==========================================================

from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User

@api_view(["POST"])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "Invalid Username"}, status=400)

    if check_password(password, user.password):
        return Response({
            "message": "Login Successful",
            "userId": user.id
        })
    else:
        return Response({"error": "Invalid Password"}, status=400)
# ==========================================================
# ADD DATA
# ==========================================================

@api_view(["POST"])
def add_data(request):

    serializer = BusinessDataSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors)


# ==========================================================
# GET DATA
# ==========================================================

@api_view(["GET"])
def get_data(request, user_id):

    data = BusinessData.objects.filter(user=user_id)

    serializer = BusinessDataSerializer(
        data,
        many=True
    )

    return Response(serializer.data)


# ==========================================================
# SIMPLE FILE ANALYSIS API (PROJECT 2)
# ==========================================================

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):

    file = request.FILES.get("file")

    if not file:
        return Response({
            "error": "No file uploaded"
        })

    try:

        if file.name.endswith(".csv"):
            df = pd.read_csv(file)

        elif file.name.endswith(".xlsx") or file.name.endswith(".xls"):
            df = pd.read_excel(file)

        else:
            return Response({
                "error": "Only CSV and Excel files supported"
            })

        df = df.fillna("")

        data = df.to_dict(orient="records")

        numeric_columns = list(
            df.select_dtypes(
                include=["int64", "float64"]
            ).columns
        )

        text_columns = list(
            df.select_dtypes(
                include=["object"]
            ).columns
        )

        analysis = {
            "columns": list(df.columns),
            "numericColumns": numeric_columns,
            "textColumns": text_columns,
        }

        return Response({
            "message": "File analyzed successfully",
            "data": data,
            "analysis": analysis
        })

    except Exception as e:

        return Response({
            "error": str(e)
        })


# ==========================================================
# AUTO DASHBOARD GENERATOR (PROJECT 3)
# ==========================================================

@api_view(["POST"])
def generate_dashboard(request):

    try:

        file = request.FILES.get("file")

        if not file:
            return Response(
                {"error": "No file uploaded"},
                status=400
            )

        df = DataProcessor.read_file(file)

        dashboard = DashboardBuilder.build(df)

        insights = InsightGenerator.generate(df)

        summary = DataProcessor.get_summary(df)

        return Response({
            "summary": summary,
            "charts": dashboard,
            "insights": insights
        })

    except Exception as e:

        return Response({
            "error": str(e)
        })