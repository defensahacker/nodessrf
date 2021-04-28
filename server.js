/* server.js - nodessrf
 *
 * Educational app to exploit SSRF and defend against them using Node.JS
 *
 * April 2021
*/

'use strict';

const express = require('express');
const app = express();
const http = require('http');
const urlm = require('url');

app.get('/', (req, res) => {
  res.set("X-XSS-Protection", "0");
  var url = req.query.url;
  if (url != null ) {
    console.log("[+] URL received: "+url);
    const myURL= urlm.parse(url);
    var options = {
      host: myURL.hostname,
      path: myURL.pathname,
      port: '80',
      headers: {'Metadata-Flavor': 'Google'}
    };
    var callb = function(response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        res.send(get_reply(url, str));
      });
    }
    var req = http.request(options, callb);
    req.end();
  } else {
    res.send(get_request(url));
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

function get_request(name) {
	return "<!DOCTYPE html>\n" + 
  "<html>\n" + 
  "<head>\n" +
    '<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>SSRF labs | Defensahacker Academy</title>\n' +
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">\n' +
    '<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>\n' +
  '</head>\n' +
  "<body>\n" + 
  	"<div class='container'><section class='section'>\n" +
    "<h1 class='title'>SSRF Lab | Defensahacker Academy</h1>\n\n\n" + 
    'Write the API URL to call below:\n\n\n' + 
    "<form method=get>\n" + 
    '<div class="field">\n' +
    '<div class="control">\n' +
    "<input class='input is-danger' style=\"width: 600px; height: 30px;\" type=text name=url placeholder=\"https://api.url/method\"/>\n" + 
    '</div>\n' +
    '</div>\n' +
    "<br/>\n<input class='button is-danger' type=submit value=Send>\n" + 
    "</form>\n" + 
    "</section></div>" +
   "</body>\n" + 
   "</html>";
 }

function get_reply(u, q) {
	return "<!DOCTYPE html>\n" + 
  "<html>\n" + 
  "<head>\n" +
    '<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>SSRF labs | Defensahacker Academy</title>\n' +
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">\n' +
    '<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>\n' +
  '</head>\n' +
  "<body>\n" + 
  	"<div class='container'><section class='section'>\n" +
  	"<h1 class='title'>SSRF labs | Defensahacker Academy</h1>\n" + 
  	"<h2>Text received through URL <b>"+u+"</b>:</h2>\n\n\n" + 
  	"<textarea class='textarea' rows=5 cols=50>"+q+"</textarea>\n\n\n" +
  	"</section></div>" +
   "</body>\n" + 
   "</html>";
}
