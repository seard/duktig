set -o xtrace

echo "Awaiting internet..."
if for i in {1..50}; do ping -c1 www.google.com &> /dev/null && break; done ; then
    echo "Internet!!!"
    echo "Attempting to resolve project..."
    if cd /home/seard/client/duktig ; then
        echo "Client exists => trying to pull latest version from Github repository..."
        if sudo -H -u seard bash -c 'git pull -f | grep -q "Already up to date."' ; then
            echo "Latest version pulled successfully. Setting up services..."
        fi
    fi
else
    echo "No internet :("
fi

cd /home/seard/client/duktig
sudo node server.js