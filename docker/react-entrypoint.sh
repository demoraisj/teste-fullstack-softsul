#!/bin/bash

yarn global add concurrently
yarn install
concurrently --restart-tries -1 --restart-after 1000 "yarn run tailwind:watch" "yarn run dev"
