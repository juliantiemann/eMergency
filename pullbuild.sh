#/bin/sh

git pull
npm install
bower install
grunt $1 
