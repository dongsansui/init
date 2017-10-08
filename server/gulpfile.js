/**
 * Created by John on 2017/9/28.
 */
var gulp = require("gulp");
var server = require("gulp-webserver");
var url = require("url");
var path = require("path");
var fs = require("fs");

gulp.task("server", function () {
    gulp.src("./")
        .pipe(server({
            port:8080,
            livereload:true,
            directoryListing:{
                path:"./",
                enable:true
            },
            middleware:function(req,res,next){
               var urlObj = url.parse(req.url);
               var mockData = path.join(__dirname,"data",urlObj.query+".json");
                console.log(mockData);
                fs.exists(mockData, function (exist) {
                    if(!exist){
                        var data = {
                            isScuccess:false,
                            data:null
                        };
                        res.writeHead(404, {
                            "Content-Type":"text/json;charset=utf-8",
                            "Access-Control-Allow-Origin":"http://localhost:63342"
                        });
                        res.end(JSON.stringify(data))
                    }else{
                        res.writeHead(200, {
                            "Content-Type":"text/json;charset=utf-8",
                            "Access-Control-Allow-Origin":"http://localhost:63342"
                        });
                        fs.readFile(mockData, function (error,result) {
                            if(error) return console.error(error);
                            var data = {
                                isScuccess:true,
                                data:result.toString()
                            };
                            res.end(JSON.stringify(data));
                        });
                    }
                })
            }
        }))
});