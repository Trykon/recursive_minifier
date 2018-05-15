var fs = require('fs');
var minify = require('minify');
var uglify = require('uglify-es');
var read = require('fs-readdir-recursive')

function uglifyFile(tempItem) {
    fs.readFile(tempItem, "utf8", (err, data) => {
      if(err)
      {
        throw err;
      }
      var uglified = uglify.minify(data);
      fs.writeFileSync(tempItem, uglified.code, (err) => {
        if(err) throw err;
      });
    });
}

function minFile(tempItem) {
  if(/(.+\.((js)|(css)))/i.test(item)&&!(/(\.json)/i.test(item))&&!(/(minify\.json)/i.test(item)))
  {
    minify(tempItem, (error, data) => {
      console.log(tempItem);
      if(error){
        if(/(.+\.js)/i.test(tempItem))
        {
          uglifyFile(tempItem)
        }
      }
      else {
        fs.writeFileSync(tempItem, data, (err) => {
          if(err) throw err;
        });
      }
    });
  }
}

async function main(tempItem){
  minFile(item);
}

var path = process.argv[2];
var files = read(path);
console.log(files);
for(i=0; i<files.length; i++)
{
  var item = path+'/'+files[i];
  main(item);
}
