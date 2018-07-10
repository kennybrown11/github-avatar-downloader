var request = require('request');

//console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
var options = { 
  url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request',
  }
};
cb(err, body);  

request(options, function(err, res, body){
var results = JSON.parse(body);
  results.forEach(function(showURL) {
  console.log("Avatar URL " + showURL.avatar_url);
  }) 
})
}

getRepoContributors("jquery", "jquery", function(err, result) {
  //console.log("Errors:", err);
  //console.log("Result:", result);
});