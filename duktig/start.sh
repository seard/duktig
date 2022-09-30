#!/bin/bash

echo KILLING PIGPIO
sudo killall pigpiod

echo KILL SERVER IF RUNNING
sudo pkill -9 -f "node server.js"

echo KILL SOCKETXP IF RUNNING
sudo pkill -9 -f "socketxp"

echo STARTING NODEJS SERVER
sudo node server.js &

echo STARTING SOCKETXP
socketxp connect http://localhost:3000 &
