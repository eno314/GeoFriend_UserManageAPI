#!/bin/sh

curl http://localhost:60080/user/1 -X PUT -d "appid=aaa&key=tweet&value=aaaaa,bbbb"
