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

echo "Awaiting internet"
if for i in {1..20}; do ping -c1 www.google.com &> /dev/null && break; done ; then
    echo "Internet!!!"

    echo "Attempting to resolve project..."
    if cd /home/seard/client/duktig ; then
        echo "Client exists => trying to pull latest version from Github repository..."
        if sudo -H -u seard bash -c 'git pull -f' ; then
            echo "Latest version pulled successfully"
        else
            echo "Failed when pulling => deleting folder and cloning new repository..."
            git status
            cd /home/
            sudo rm -rf /home/seard/client
            sudo -H -u seard bash -c 'mkdir /home/seard/client'
            sudo -H -u seard bash -c 'git clone https://github.com/seard/duktig.git /home/seard/client/'
        fi
    else
        echo "Client does not exist => creating it"
        cd /home/
        sudo rm -rf /home/seard/client
        sudo -H -u seard bash -c 'mkdir /home/seard/client'
        sudo -H -u seard bash -c 'git clone https://github.com/seard/duktig.git /home/seard/client/'
    fi

    if cd /home/seard/client/install/ ; then
        echo "Setting up services..."
        sudo ./install.sh

        cd /home/seard/client/duktig

        echo "Running npm install..."
        sudo -H -u seard bash -c 'timeout 10m npm install'
    else
        echo "Broken"
    fi

else
    echo "No internet :("
fi

#date && echo git checkout master
#date && echo git checkout
# sudo -H -u seard bash -c 'git checkout master -f'
#sudo -H -u seard bash -c 'git checkout dev -f'

#date && echo git pull
#sudo -H -u seard bash -c 'git pull'

#date && echo Running npm install
#npm install ../duktig

#date && echo ./install.sh
#sudo ./install.sh