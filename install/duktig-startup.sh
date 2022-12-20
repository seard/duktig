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

echo "Awaiting internet..."
if for i in {1..50}; do ping -c1 www.google.com &> /dev/null && break; done ; then
    echo "Internet!!!"
    echo "Attempting to resolve project..."
    if cd /home/seard/client/duktig ; then
        echo "Client exists => trying to pull latest version from Github repository..."
        if sudo -H -u seard bash -c 'git pull -f | grep -q "Already up to date."' ; then
            echo "Latest version pulled successfully. Setting up services..."
        else
            echo "Failed when pulling => deleting folder and cloning new repository..."
            sudo rm -rf /home/seard/client
            sudo -H -u seard bash -c 'mkdir /home/seard/client && git clone https://github.com/seard/duktig.git /home/seard/client/'
        fi
    else
        echo "Client does not exist => creating it"
        sudo rm -rf /home/seard/client || true
        sudo -H -u seard bash -c 'mkdir /home/seard/client && git clone https://github.com/seard/duktig.git /home/seard/client/'
    fi

else
    echo "No internet :("
fi

cd /home/seard/client/duktig
sudo node server.js
