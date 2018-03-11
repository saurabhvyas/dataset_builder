const request = require("request");
const fs = require("fs");

const url = {
  url:"http://translate.google.com/translate_tts?client=tw-ob&ie=UTF-8&idx=0&total=1&tl=hi&q='साइना नेहवाल को अपनी पुरानी प्रतिद्वंद्वी और विश्व की नंबर एक'"
  , headers: {

      

    }
  };

console.log(url.url)

request(url, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
