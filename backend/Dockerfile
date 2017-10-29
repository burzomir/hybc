FROM python:3.6


ADD ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

ADD . /app

WORKDIR /app

RUN python manage.py migrate

CMD python manage.py runserver 0.0.0.0:8000
