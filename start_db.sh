#!/bin/sh

MONGOD=$1
$MONGOD --port 20000 --dbpath /Users/dev0/Desktop/mongodb.data --directoryperdb
