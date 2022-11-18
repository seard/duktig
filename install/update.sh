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

set -o xtrace

echo "Attempting to resolve project..."
if cd /home/seard/client/duktig ; then
    echo "Client exists => trying to pull latest version from Github repository..."
    git status
    if sudo -H -u seard bash -c 'git pull' ; then
        echo "Latest version pulled successfully"
    else
        echo "Failed when pulling => deleting folder and cloning new repository..."
        git status
        sudo rm -rf /home/seard/client
        mkdir /home/seard/client
        sudo -H -u seard bash -c 'mkdir /home/seard/client'
        sudo -H -u seard bash -c 'git clone https://github.com/seard/duktig.git /home/seard/client/'
    fi
else
    echo "Client does not exist => creating it"
    sudo rm -rf /home/seard/client
    sudo -H -u seard bash -c 'mkdir /home/seard/client'
    sudo -H -u seard bash -c 'git clone https://github.com/seard/duktig.git /home/seard/client/'
fi

cd /home/seard/client/duktig

echo "Running npm install..."
npm install
sudo ../install/install.sh
sudo systemctl daemon-reload