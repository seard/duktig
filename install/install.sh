#!/bin/bash

set -o xtrace
sudo cp duktig-startup.sh /etc/network/if-up.d/
sudo cp duktig-startup.sh /home/seard/

echo "Run:"
echo "$ crontab -e"
echo "Append:"
echo "@reboot sleep 30 && /home/seard/duktig-startup.sh"