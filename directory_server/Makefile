BASEURL="http://localhost:8080"
test:
	curl -X PUT --data '{"uuid":"foo", "localURL":null}' $(BASEURL)/thing/foo
	curl $(BASEURL)/ls
	curl $(BASEURL)/thing/foo
