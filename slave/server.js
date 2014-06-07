var express = require('express');
var getRawBody = require('raw-body');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync(process.argv[2]));

var app = express();

//handle post/put
app.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb',
    encoding: 'utf8'
  }, function (err, string) {
    if (err)
      return next(err)

    req.text = string
    next()
  })
})

var state = {};

try {
  state = JSON.parse(fs.readFileSync(config.tagFile));
} catch(e) {
  console.warn("Failed to parse " + config.tagFile + "\n" + e)
  
}

app.get("/tags/", function(req, res) {
  res.json(state);
})

function commit(callback) {
  fs.writeFile(config.tagFile, JSON.stringify(state), callback)

}

app.put(/^\/tags\/[A-z:.-]+$/, function(req, res, next) {
  var tagName = req.path.substr("/tags/".length);
  state[tagName] = req.text;
  commit(function(err) {
    if (err)
      return next(err);
    res.send("OK");
  });
})

app.delete(/^\/tags\/([A-z:.-]+|\*)$/, function(req, res, next) {
  var tagName = req.path.substr("/tags/".length);
  delete state[tagName];
  if (tagName == "*")
    state = {};

  commit(function(err) {
    if (err)
      return next(err);
    res.send("OK");
  });
})

var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});
