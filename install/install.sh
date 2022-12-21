#!/bin/bash

set -o xtrace

sudo rm /etc/network/if-up.d/duktig-startup.sh || true
sudo rm /home/seard/duktig-startup.sh || true

# sudo cp duktig-startup.sh /etc/network/if-up.d/
sudo cp duktig-startup.sh /home/seard/

echo "Run:"
echo "$ crontab -e"
echo "Append:"
echo "@reboot sleep 30 && /home/seard/duktig-startup.sh"