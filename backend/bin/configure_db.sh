#!/bin/bash

export PGPASSWORD='postgres'

echo "Configuring Developmental Database..."

dropdb -U postgres nod-dev-db
createdb -U postgres nod-dev-db

echo "Running SQL Queries..."

psql --host=node-dev-db.co0yt0ujh01m.us-east-2.rds.amazonaws.com --port=5432 -U postgres postgres < ./bin/sql/accountTable.sql

echo "Developmental Database Configured!"