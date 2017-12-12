var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", function(socket){
    console.log(socket.id + " vua ket noi");

    // Lắng nghe sự kiện người dùng disconnect 
    socket.on("disconnect", function(){
        console.log(socket.id + " vua ngat ket noi");
    });

    // Server lắng nghe dữ liệu từ người dùng gửi lên 
    socket.on("client-send-data", function(data){
        console.log(socket.id + " : vua gui len " +data);
        // Server gửi dữ liệu nhận được về cho tất cả người dùng 
        io.sockets.emit("server-send-data", data);
        // socket.emit : Chỉ gửi dữ liệu về cho user vừa gửi dữ liệu lên , những người khác sẽ không nhận được
        // socket.broadcast.emit : Chỉ người dữ liệu cho người khác người gửi dữ liệu lên server sẽ không nhận được 
    });

});

app.get("/", function(req , res){
    res.render("trangchu");
});