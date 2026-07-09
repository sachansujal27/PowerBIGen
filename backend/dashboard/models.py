from django.db import models
import json

from django.core.validators import RegexValidator
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
    email = models.EmailField(unique=True)
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
    

# ------------------------------------------------------------------------------
# Excel project
# ------------------------------------------------------------
 
# A "proper name" = letters, spaces, hyphens and apostrophes only.
# Blocks things like "asdf123" or "N/A" from being saved as a name.
proper_name_validator = RegexValidator(
    regex=r"^[A-Za-z][A-Za-z '\-]{1,99}$",
    message="Enter a proper name (letters, spaces, hyphens and apostrophes only, min 2 characters).",
)
 
 
class Record(models.Model):
    name = models.CharField(max_length=100, validators=[proper_name_validator])
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    age = models.PositiveSmallIntegerField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
 
    class Meta:
        ordering = ["id"]
 
    def __str__(self):
        return f"{self.id} - {self.name}"
 
    def save(self, *args, **kwargs):
        # Normalize to Title Case so "john  smith" -> "John  Smith"
        if self.name:
            self.name = " ".join(part.capitalize() for part in self.name.strip().split(" "))
        super().save(*args, **kwargs)
 


#
# 
#  from django.db import models

# class UploadedFile(models.Model):
#     file = models.FileField(upload_to='uploads/')
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.file.name
    

