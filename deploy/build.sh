#!/bin/bash

docker build --no-cache=true -t recruity11/base:nexters.web . && docker push recruity11/base:nexters.web