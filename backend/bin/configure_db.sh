#!/bin/bash

export PGPASSWORD='postgres'

echo "Configuring Developmental Database..."

dropdb -U postgres devdb
createdb -U postgres devdb 

echo "Running SQL Queries..."

psql -U postgres devdb < ./bin/sql/accountTable.sql

echo "Developmental Database Configured!"