#!/bin/sh

curl http://localhost:60080/user/1 -X PUT -d "tag=hoge&value=newnew&appid=fugafuga"
