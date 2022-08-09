#!/usr/bin/env bash

echo "===> Building ..."
npm run build --omit=dev

echo "===> Running ..."
exec serve -s build
