from django.db import models
import json

class UploadedFile(models.Model):
    """Stores metadata about each uploaded file"""
    FILE_TYPES = [
        ('csv', 'CSV'),
        ('excel', 'Excel'),
        ('pdf', 'PDF'),
    ]
    name        = models.CharField(max_length=255)
    file_type   = models.CharField(max_length=10, choices=FILE_TYPES)
    file        = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    row_count   = models.IntegerField(default=0)
    col_count   = models.IntegerField(default=0)
    file = models.FileField(upload_to='datasets/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

  

    def __str__(self):
        return self.name


class DataSession(models.Model):
    """Stores parsed data columns for a session"""
    uploaded_file = models.ForeignKey(
        UploadedFile, on_delete=models.CASCADE, related_name='sessions'
    )
    columns_json  = models.TextField()   # JSON: list of column names
    dtypes_json   = models.TextField()   # JSON: {col: dtype}
    preview_json  = models.TextField()   # JSON: first 10 rows
    created_at    = models.DateTimeField(auto_now_add=True)

    def get_columns(self):
        return json.loads(self.columns_json)

    def get_dtypes(self):
        return json.loads(self.dtypes_json)

    def get_preview(self):
        return json.loads(self.preview_json)


class GeneratedChart(models.Model):
    """Stores each generated chart"""
    CHART_TYPES = [
        ('bar',        'Bar Chart'),
        ('line',       'Line Chart'),
        ('pie',        'Pie Chart'),
        ('scatter',    'Scatter Plot'),
        ('histogram',  'Histogram'),
        ('heatmap',    'Heatmap'),
        ('area',       'Area Chart'),
        ('box',        'Box Plot'),
    ]
    session    = models.ForeignKey(
        DataSession, on_delete=models.CASCADE, related_name='charts'
    )
    chart_type = models.CharField(max_length=20, choices=CHART_TYPES)
    x_axis     = models.CharField(max_length=100, blank=True)
    y_axis     = models.CharField(max_length=100, blank=True)
    title      = models.CharField(max_length=255, blank=True)
    image      = models.ImageField(upload_to='charts/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.chart_type} — {self.title}"
    
   


class User(models.Model):

    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class BusinessData(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    sales = models.FloatField()
    expenses = models.FloatField()
    customers = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
       return str(self.id)
    





#
# 
#  from django.db import models

# class UploadedFile(models.Model):
#     file = models.FileField(upload_to='uploads/')
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.file.name
    