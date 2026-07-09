from django.db import models
from django.core.validators import RegexValidator


proper_name_validator = RegexValidator(
    regex=r"^[A-Za-z][A-Za-z '\-]{1,99}$",
    message="Enter a proper name.",
)

class Record(models.Model):
    data = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Record {self.id}"