#!/usr/bin/env bash

echo "===> Building ..."
npm run build --production

echo "===> Running ..."
exec serve -s build
