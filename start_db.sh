#!/bin/sh

MONGOD=$1
$MONGOD --port 20000 --dbpath ./mongodb.data --directoryperdb
