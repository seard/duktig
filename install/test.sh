set -o xtrace

if cd /home/seard/client/duktig ; then
    echo "Client exists => trying to pull latest version from Github repository..."
    if sudo -H -u seard bash -c 'git pull -f' ; then
        echo "true"
    else
        echo "false"
    fi
fi