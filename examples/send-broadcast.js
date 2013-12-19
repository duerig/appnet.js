var appnet = require('../dist/appnet');

appnet.authorize('<your access token here>');

var builder = new appnet.recipes.BroadcastMessageBuilder();
builder.channelID = 24204;
builder.headline = "Hello World!";
builder.text = "Sending this from [appnet.js](https://github.com/duerig/appnet.js) was easy!";
builder.parseMarkdownLinks = true;
builder.readMoreLink = "http://celeryman.ytmnd.com/";
// Supports sending a file, if you attach a filename.
// builder.photo = 'giphy.gif';
builder.send().then(function (response) {
  console.log('Sent!');
}, function (response) {
  console.log('Failed:', response);
});
