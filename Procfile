release: python manage.py migrate
web: daphne APLUSEDU.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker --settings=APLUSEDU.settings -v2
