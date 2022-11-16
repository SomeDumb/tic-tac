# pull python
FROM python:3.10-alpine

# set workdir
WORKDIR /app/backend

# copy project
COPY . /app/backend

# disable writing bytecode
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

# install dependencies
RUN pip install --upgrade pip
COPY requirements.txt /app/backend

RUN  \
    apk update && \
    apk upgrade && \
    apk add bash && \
    apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    pip3 install --upgrade pip -r requirements.txt && \
    apk --purge del .build-deps

RUN python manage.py collectstatic

ENV PORT 8000
EXPOSE 8000
