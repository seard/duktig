#!/bin/bash

###
# CAREFUL, DON*T TOUCH THIS FILE OR THE PROJECT MAY BREAK
# THIS FILE IS CALLED BY duktig-updater.service
###

date && echo git checkout master
git checkout master

date && echo git pull
git pull

date && echo ./install.sh
./install.sh