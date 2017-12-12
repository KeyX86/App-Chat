var socket = io("http://localhost:3000");

// Thông tin dữ liệu từ server gửi về , thông báo đăng kí thất bại
socket.on("server-send-dktb", function(){
	alert("Đăng kí thất bại , user đã tồn tại");
});

// Nhận thông tinh từ server gửi về , thông báo đăng kí thành công
socket.on("server-send-dktc", function(user){
	$("#currentUser").html(user);	// Chèn dữ liệu được nhận vào thẻ span 
	$("#loginform").hide(2000);
	$("#chatform").show(1000);
});

socket.on("server-send-dsUser",function(data){
	$("#boxContent").html("");
	data.forEach(function(i){
		$("#boxContent").append("<div class='user'>"+ i +"</div>");
	});
});

socket.on("co-nguoi-logout",function(){
	$("#loginform").show();
	$("#chatform").hide();
});

socket.on("server-send-message",function(data){
	$("#listMessages").append("<div class='us'>"+ data.un + " : " + data.nd + "</div>");
});

socket.on("ai-do-dang-go-chu",function(data){
	$("#thongbao").html(data);
});

socket.on("ai-do-ngung-go-chu", function(){
	$("#thongbao").html("");
});
$(document).ready(function(){
	$("#loginform").show();
	$("#chatform").hide();

	// Bắt sự kiện người dùng đang nhập chữ 
	$("#txtMessage").focusin(function(){
		socket.emit("co-nguoi-dang-gui");
	});
	// Bắt sự kiện người dùng ngừng nhập chữ 
	$("#txtMessage").focusout(function(){
		socket.emit("co-nguoi-nhap-xong");
		
	});

	// Gửi thông tin người dùng đăng kí lên server khi click vào nút Register
	$("#btnRegister").click(function(){
		socket.emit("client-send-username", $("#txtUsername").val());
	});
	// Thông báo lên server user logout
	$("#btnLogout").click(function(){
		socket.emit("logout");
	});

	$("#btnSendMessage").click(function(){
		socket.emit("client-send-message", $("#txtMessage").val());
	});
});