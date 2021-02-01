#!/bin/bash

ROOT="$(pwd)"

cd $ROOT/front && kitty -1 yarn dev

cd $ROOT
