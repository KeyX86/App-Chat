var socket = io("http://localhost:3000");
socket.on("server-send-dsRoom",function(data){
	$("#listRoom").html("");
	data.forEach(function(i){
		$("#listRoom").append("<h4>" + i + "</h4>");
	});
});
$(document).ready(function(){
	$("#btnTaoRoom").click(function(){
		// Gửi yêu cầu tạo room lên server 
		socket.emit("client-send-room",$("#txtRoom").val());
	});
});