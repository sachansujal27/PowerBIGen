from rest_framework import serializers
from .models import UploadedFile, DataSession, GeneratedChart
from rest_framework import serializers
from .models import User, BusinessData
from rest_framework import serializers
 
from .models import Record



class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = UploadedFile
        fields = '__all__'


class DataSessionSerializer(serializers.ModelSerializer):
    columns = serializers.SerializerMethodField()
    dtypes  = serializers.SerializerMethodField()
    preview = serializers.SerializerMethodField()

    class Meta:
        model  = DataSession
        fields = ['id', 'uploaded_file', 'columns',
                  'dtypes', 'preview', 'created_at']

    def get_columns(self, obj): return obj.get_columns()
    def get_dtypes(self,  obj): return obj.get_dtypes()
    def get_preview(self, obj): return obj.get_preview()


class GeneratedChartSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model  = GeneratedChart
        fields = ['id', 'session', 'chart_type', 'x_axis',
                  'y_axis', 'title', 'image_url', 'created_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    

  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BusinessDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessData
        fields = '__all__'


        from rest_framework import serializers
from .models import BusinessData


class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model=UploadedFile
        fields="__all__"



# -------------------------------------Excel-----
from rest_framework import serializers
from .models import Record


# ---------------------------------------
# Record Serializer
# ---------------------------------------
class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ["id", "data"]
        read_only_fields = ["id"]


# ---------------------------------------
# Bulk Create Serializer
# ---------------------------------------
class BulkRecordCreateSerializer(serializers.Serializer):

    records = serializers.ListField(
        child=serializers.DictField(),
        allow_empty=False
    )

    def validate_records(self, value):
        MIN_RECORDS = 1
        MAX_RECORDS = 10000

        if len(value) < MIN_RECORDS:
            raise serializers.ValidationError(
                "Please submit at least one record."
            )

        if len(value) > MAX_RECORDS:
            raise serializers.ValidationError(
                f"Maximum {MAX_RECORDS} records are allowed."
            )

        return value

    def create(self, validated_data):

        records = validated_data["records"]

        objects = []

        for row in records:

            cleaned = {}

            for key, val in row.items():

                if key is None:
                    continue

                cleaned[str(key).strip()] = val

            objects.append(
                Record(
                    data=cleaned
                )
            )

        return Record.objects.bulk_create(
            objects,
            batch_size=1000
        )


# from rest_framework import serializers
# from .models import UploadedFile

# class UploadedFileSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = UploadedFile
#         fields = '__all__'