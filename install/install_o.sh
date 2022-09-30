#!/bin/bash

echo Installing Duktig...

echo Removing services if exists
sudo rm /etc/systemd/system/duktig.service
sudo rm /etc/systemd/system/socketxp.service

echo Removing folder /usr/bin/duktig/ if exists
sudo rm -rf /usr/bin/duktig-vue

echo Copying project folder to /usr/bin/duktig
sudo cp -r ../duktig-vue /usr/bin/

echo Copying services folder
sudo cp duktig.service /etc/systemd/system/duktig.service
sudo cp socketxp.service /etc/systemd/system/socketxp.service

echo Enabling services
sudo systemctl enable duktig.service
sudo systemctl enable socketxp.service

read -p "DO YOU WISH TO REBOOT NOW? (y/n) " yn

case $yn in 
	y ) echo REBOOTING...;;
	n ) echo EXITING...;
		exit;;
	* ) echo INVALID RESPONSE;
		exit 1;;
esac

sudo reboot

