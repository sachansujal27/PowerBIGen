from rest_framework import serializers
from .models import UploadedFile, DataSession, GeneratedChart
from rest_framework import serializers
from .models import User, BusinessData



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

# from rest_framework import serializers
# from .models import UploadedFile

# class UploadedFileSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = UploadedFile
#         fields = '__all__'