#!/bin/bash

ROOT="$(pwd)"

cd $ROOT/front && yarn install

cd $ROOT/back && yarn install
yarn run prisma generate

cd $ROOT
