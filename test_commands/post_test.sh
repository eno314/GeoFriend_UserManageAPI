#!/bin/sh

PARAM1="user[name]=hogehoge"
PARAM2="user[appid]=fugafuga"

curl http://localhost:60080/user -X POST -d "user[name]=hogehoge" -d "user[appid]=fugafuga"
