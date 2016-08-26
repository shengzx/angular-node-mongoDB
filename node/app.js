var PORT = 3000;

var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');
var zlib = require('zlib');
var bufferList = {};
var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  if (pathname === "/") {
    pathname = "/index.html";
  }
  var realPath = "";

  var realPath = path.join("../",pathname);
  console.log(realPath);
  var ext = path.extname(realPath);
  ext = ext ? ext.slice(1) : 'unknown';
  fs.exists(realPath, function (exists) {
    if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      response.write("This request URL " + pathname + " was not found on this server.");
      response.end();
    } else {
      console.log(realPath + " realPath");
      var key = "key" + realPath.replace(/[.]/g, "").replace(/[/]/g, "_").replace(/\\/g, "_");
      var acceptEncoding = request.headers['accept-encoding'];
      var etag = request.headers['if-none-match'];
      var modifySince = request.headers['if-modified-since'];
      var contentType = mine[ext] || "text/plain";
      //是否支持压缩
      fs.stat(realPath, function (err, stats) {
        var mtime = Date.parse(stats.mtime);
        if (err) {
          SendError(response, err);
          return;
        }
        //304
        if ((etag && etag === key) && (modifySince && modifySince - mtime === 0)) {
          console.log(304);
          response.writeHead(304, {
            'Content-Type': contentType,
            'Content-Encoding': acceptEncoding,
            'ETag': etag,
            'Last-Modified': modifySince,
            'Cache-Control': 's-maxage=3600'
          });
          response.end();
        }
        //加载数据进入缓存 200
        else if (!bufferList.hasOwnProperty(key) || (etag && etag !== key) || (modifySince && modifySince - mtime !== 0)) {
          console.log(200 + "modifySince:" + modifySince);
          var buffer = new Buffer(stats.size);
          fs.open(realPath, 'r', function (err, fd) {
            if (err) {
              SendError(response, err);
            }
            else {
              fs.read(fd, buffer, 0, buffer.length, 0, function (err, byteslength) {
                if (acceptEncoding && acceptEncoding.indexOf('gzip') != -1) {
                  bufferList[key] = {
                    buffer: zlib.gzipSync(buffer),//同步压缩buffer;
                    modify: mtime,//最后一次修改时间
                    etag: key//etag标签
                  };
                }
                else {
                  bufferList[key] = {
                    buffer: buffer,//同步压缩buffer;
                    modify: mtime,//最后一次修改时间
                    etag: key//etag标签
                  };
                }

                SendBuffer(response, bufferList[key])
              });
              console.log(realPath + " 文件读取成功！");
              fs.close(fd, function (err) {
                console.log(realPath + " 文件关闭成功");
              });

            }
          });
        }
        //缓存数据 200
        else if (bufferList.hasOwnProperty(key) && etag && modifySince) {
          console.log(200 + "server cache");

          SendBuffer(response, bufferList[key])
        }
        else {
          console.log("file");

          SendFile(response, realPath, {
            modify: mtime,//最后一次修改时间
            etag: key//etag标签
          });
        }
      });
      function SendBuffer(response, msg) {
        if (acceptEncoding && acceptEncoding.indexOf('gzip') != -1) {
          response.writeHead(200, {
            'Content-Type': contentType,
            'Content-Encoding': 'gzip',
            'ETag': msg.etag,
            'Last-Modified': msg.modify,
            'Cache-Control': 's-maxage=3600'
          });
        }
        else {
          response.writeHead(200, {
            'Content-Type': contentType,
            'ETag': msg.etag,
            'Last-Modified': msg.modify,
            'Cache-Control': 's-maxage=3600'
          });
        }
        response.write(msg.buffer);
        response.end();
      }
      function SendError(response, err) {
        response.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        response.end(err);
      }
      function SendFile(response, realPath, stats) {
        fs.exists(realPath, function (isExistsgz) {
          fs.readFile(realPath, function (err, file) {
            if (err) {
              SendError(response, err);
            } else {
              response.writeHead(200, {
                'Content-Type': contentType,
                'ETag': stats.etg,
                'Last-Modified': stats.modify,
                'Cache-Control': 's-maxage=3600'
              });
              response.write(file, "binary");
              response.end();
            }
          });
        });
      }
    }
  });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");