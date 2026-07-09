from rest_framework import serializers
from .models import Record


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ["id", "data", "created_at"]


class BulkRecordCreateSerializer(serializers.Serializer):

    records = serializers.ListField(
        child=serializers.DictField()
    )

    def create(self, validated_data):

        objects = []

        for item in validated_data["records"]:
            objects.append(
                Record(data=item)
            )

        return Record.objects.bulk_create(objects)