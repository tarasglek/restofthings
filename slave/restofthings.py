#!/usr/bin/python
import socket
import httplib
import os
import json

def getExternalIP():
    sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    sock.connect(('google.com', 80))
    ip = sock.getsockname()[0]
    sock.close()
    return ip


UUID=os.popen("cat /sys/class/net/*/address |sha1sum").read().split(" ")[0];
str = json.dumps({'uuid':UUID, 'localURL':("http://"+getExternalIP())});
print str

connection =  httplib.HTTPConnection('restofthings.glek.net:8080')
connection.request('PUT', '/thing/'+UUID, str)
result = connection.getresponse()
print result.read()
