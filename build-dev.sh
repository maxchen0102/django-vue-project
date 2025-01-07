#!/bin/bash
# This script is used to build the project for development

echo "===========Building frontend for development============"
npm run build

echo "===========Building backend for development============"
python manage.py collectstatic --noinput
python manage.py migrate

echo "================Project has been built successfully===================="
