var socket = io("http://localhost:8000");

$(document).ready(function(){
    $("#btnTaoroom").click(function(){
        socket.emit("client-send-tao-room", $("#txtRoom").val());
    });

});