var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8000);

io.on("connection", function(socket){
    console.log(socket.id + " vua ket noi");
    socket.on("disconnect", function(){
        console.log(socket.id + " vua ngat ket noi");
    });

    socket.on("client-send-data", function(data){
        console.log(data);
        io.sockets.emit("server-send-color", data);
    });
});
app.get("/", function(req , res){
    res.render("trangchu");
});
