#!/bin/bash

ROOT="$(pwd)"

cd $ROOT/front && yarn install

cd $ROOT/back && yarn install

cd $ROOT
