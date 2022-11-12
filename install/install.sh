#!/bin/bash

###
# CAREFUL, DON*T TOUCH THIS FILE OR THE PROJECT MAY BREAK
# THIS FILE IS RUN BY update.sh, CALLED BY duktig-updater.service ON STARTUP
###

date && echo Installing Duktig...

date && echo Stopping services if exists
sudo systemctl stop duktig.service
sudo systemctl stop duktig-updater.service

date && echo Removing services if exists
sudo rm /etc/systemd/system/duktig.service
sudo rm /etc/systemd/system/duktig-updater.service

#echo Removing folder /usr/bin/duktig/ if exists
#sudo rm -rf /usr/bin/duktig

#echo Copying project folder to /usr/bin/duktig
#sudo cp -r ../duktig /usr/bin/

date && echo Copying services to services folder
sudo cp duktig.service /etc/systemd/system/duktig.service
sudo cp duktig.service /etc/systemd/system/duktig-updater.service

date && echo Enabling services
sudo systemctl enable duktig.service
sudo systemctl enable duktig-updater.service

#read -p "DO YOU WISH TO REBOOT NOW? (y/n) " yn

#case $yn in 
#	y ) echo REBOOTING...;;
#	n ) echo EXITING...;
#		exit;;
#	* ) echo INVALID RESPONSE;
#		exit 1;;
#esac

#sudo reboot
