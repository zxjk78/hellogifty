#!/bin/bash
sed -i 's/a705/ssafy/g' ./backend/src/main/resources/application.properties
sed -i 's/local_hello_gifty/200FDE36D0ABCE04B6E/g' ./backend/src/main/resources/application.properties

sed -i 's/\/src\/main\/resources\/static\/img\/gifticon\//\/home\/ubuntu\/img\/gifticon\//g' ./backend/src/main/resources/application.properties
sed -i 's/\/src\/main\/resources\/static\/img\/gifticon_cropped\//\/home\/ubuntu\/img\/gifticon_cropped\//g' ./backend/src/main/resources/application.properties
sed -i 's/\/src\/main\/resources\/static\/img\/brand\//\/home\/ubuntu\/img\/brand\//g' ./backend/src/main/resources/application.properties



