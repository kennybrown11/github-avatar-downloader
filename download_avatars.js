var request = require('request');
var fs = require('fs')


function getRepoContributors(repoOwner, repoName, cb) {
  var options = { 
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
    }
  }  
  request(options, function(err, res, body){
  
    cb(err, JSON.parse(body));    
    }) 
};

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {  
    throw err; 
  })
  .pipe(fs.createWriteStream(filePath)); 
}

let arrNames = process.argv.slice(2);

getRepoContributors(arrNames[0], arrNames[1], function(err, result) {
  result.forEach(function(element) {
    downloadImageByURL(element.avatar_url, "avatars/" + element.login + ".jpeg")
  })
  
});