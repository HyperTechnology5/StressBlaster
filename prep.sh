#!/bin/sh


cfg_ver=$(grep '<widget ' config.xml | sed -e 's/^.*version="//' -e 's/".*$//')
echo "Building version: $cfg_ver"

