#!/bin/bash

###
# CAREFUL, DON*T TOUCH THIS FILE OR THE PROJECT MAY BREAK
# THIS FILE IS CALLED BY duktig-updater.service ON STARTUP
#
# THE CHAIN STARTED BY THIS FILE WILL:
# 1: FETCH THE LATEST VERSION FROM MASTER
# 2: CALL install.sh
#    a: KILL THE EXISTING SERVICES AND REPLACE THEM
#    b: START THE SERVICES
###

date && echo git checkout
# sudo -H -u seard bash -c 'git checkout master -f'
sudo -H -u seard bash -c 'git checkout dev -f'

date && echo git pull
sudo -H -u seard bash -c 'git pull'

date && echo ./install.sh
sudo ./install.sh