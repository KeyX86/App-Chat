var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8000);

var room = [];
// socket.adapter.rooms : xuất ra các rooms hiển có trên server
io.on("connection", function(socket){
    console.log(socket.id + " vua ket noi");

    socket.on("client-send-tao-room",function(data){
        socket.join(data);
        UpdateRoom();
    });
    
    function UpdateRoom(){
        console.log(socket.adapter.rooms);
    };
});

app.get("/", function(req , res){
    res.render("trangchu");
});