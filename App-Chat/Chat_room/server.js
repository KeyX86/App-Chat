var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection",function(socket){
	console.log("Co nguoi ket noi");

	// Lắng nghe yêu cầu tạo room từ phía client
	socket.on("client-send-room",function(data){
		// Đưa socket hiện tạo vào room mới
		socket.join(data);
		socket.Phong=data;
		
		var mang=[];
		for(r in socket.adapter.rooms){
			mang.push(r);
		}
		io.sockets.emit("server-send-dsRoom",mang);
	});
});

app.get("/",function(req , res){
	res.render("trangchu");
});