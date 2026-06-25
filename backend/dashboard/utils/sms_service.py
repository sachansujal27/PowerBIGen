import requests
from django.conf import settings

def send_support_sms(phone, message):
    url = "https://api.brevo.com/v3/transactionalSMS/sms"

    payload = {
        "sender": "AurexBI",
        "recipient": phone,
        "content": message,
        "type": "transactional"
    }

    headers = {
        "accept": "application/json",
        "api-key": settings.BREVO_API_KEY,
        "content-type": "application/json"
    }

    response = requests.post(
        url,
        json=payload,
        headers=headers
    )

    print("SMS STATUS:", response.status_code)
    print("SMS RESPONSE:", response.text)

    return response.json()