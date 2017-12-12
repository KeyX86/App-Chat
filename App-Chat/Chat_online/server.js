var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
	
	// Lưu trữ username của khách hàng 
	var mangUser = [];
io.on("connection", function(socket){
	console.log(socket.id + " vua ket noi");

	socket.on("disconnect", function(){
		console.log(socket.id + " vua ngat ket noi");
	});

	// Server lắng nghe dữ liệu người dùng gửi lên , username
	socket.on("client-send-username", function(data){
		// Kiểm tra xem user đã tồn tại hay chưa 
		if(mangUser.indexOf(data)>= 0){
			// False
			socket.emit("server-send-dktb");
		}
		else{
			//Success
			mangUser.push(data); // Cập nhập dữ liệu vào trong mảng 
			socket.username = data;
			socket.emit("server-send-dktc",data); // Gửi dữ liệu về cho server 
			// Gửi danh sách người đang online về cho toàn người dùng
			io.sockets.emit("server-send-dsUser",mangUser);
		}
	});

	socket.on("logout",function(){
		mangUser.splice(mangUser.indexOf(socket.username),1);
		UpdateUsername();
		console.log(socket.username + " vua logout khoi he thong");
		socket.emit("co-nguoi-logout");
	});

	function UpdateUsername(){
		socket.broadcast.emit("server-send-dsUser",mangUser);
	};

	socket.on("client-send-message",function(data){
		io.sockets.emit("server-send-message", {un:socket.username,nd:data});
	});

	socket.on("co-nguoi-dang-gui",function(){
		var s = socket.username + " dang gui tin";
		socket.broadcast.emit("ai-do-dang-go-chu",s);
	});

	socket.on("co-nguoi-nhap-xong",function(){
		socket.broadcast.emit("ai-do-ngung-go-chu");
	});
});


app.get("/", function(req , res){
	res.render("trangchu");
});
