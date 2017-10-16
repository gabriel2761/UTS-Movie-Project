#!/bin/bash

# Installing npm (node package manager)
apt-get update
apt-get upgrade -y
apt-get install -y npm

# Using npm to install n (node version manager)
npm cache clean -f
npm install -g n

# Using n to install the latest stable version of node
n stable

# Installing yarn (alternative package manager for node)
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt-get update
apt-get install -y yarn

# Installing nginx (web server)
apt-get install -y nginx

# Installing and configuring mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
cp mongodb.service /etc/systemd/system/mongodb.service
systemctl start mongodb
systemctl enable mongodb
