var baseurl = "http://restofthings.glek.net:8080";
$.ajax({"url":baseurl + "/ls"}).done(function (data) {
  var ls = JSON.parse(data);
  ls.forEach(function (thingid) {
    var url = baseurl + "/thing/" + thingid;
   // alert(url);
    $.ajax({"url":url}).done(function (data) {
      alert(data);
    });
  });
});
