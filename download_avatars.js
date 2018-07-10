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
}


function getName(myArgs) {
  if (getName === undefined){
    console.log("Error: Incorrect Login ")
  } else {
  for (var i = 0; i < myArgs.length; i++) {
    var currentString = myArgs[i]
    var getName = "";

    for (var x = currentString.length - 1; x >= 0; x--) {
      getName += currentString[x];
    }
  }
    getRepoContributors(getName)
  }
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {  
    throw err; 
  })
  .pipe(fs.createWriteStream(filePath)); 
}


getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(element) {
    downloadImageByURL(element.avatar_url, "avatars/" + element.login + ".jpeg")
  })
  
});

getName(process.argv.slice(2));
