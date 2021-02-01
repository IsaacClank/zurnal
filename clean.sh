#!/bin/bash

ROOT="$(pwd)"

cd $ROOT/front && yarn clean

cd $ROOT/back && yarn clean

cd $ROOT
