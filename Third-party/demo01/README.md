### 示例01-创建Socket.IO创建通信
示例01-创建Socket.IO创建通信  
原文： [示例01-创建Socket.IO创建通信](http://blog.csdn.net/yuanzu0917/article/details/51580496)  

服务器端代码


	var http = require("http");
	var sio = require("socket.io");
	var fs = require("fs");
	
	var server = http.createServer(function(req,res){
	    res.writeHead(200,{"content-type":"text/html"});
	    res.end(fs.readFileSync("./index.html"));
	});
	
	server.listen("3000");
	var socket = sio.listen(server);
	socket.on("connection",function(socket){
	    console.log("客户端建立连接");
	    socket.send("你好。");
	    socket.on("message",function(msg){
	        console.log("接收到的第一个消息：",msg);
	    });
	    socket.on("disconnect",function(){
	        console.log("客户端断开连接");
	    });
	});

客户端代码

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	</head>
	<body>
	</body>
	<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
	<script>
	    var socket = io.connect();
	    //当客户端收到消息时执行的回调函数
	    socket.on("message",function(data){
	        console.log(data);
	        socket.send("消息已接收到");
	    });
	    //当与服务器端失去连接时执行的回调函数
	    socket.on("disconnect",function(){
	        console.log("服务器断开连接。")
	    });
	</script>
	</html>

在使用Socket.IO类库时，服务器端与客户端之间除了可以相互发送消息之外，也可以使用socket端口对象的emit方法相互发送事件。

    socket.emit(event,data,{callback});
1
参数 
1. event：【String】用于指定事件名称；   
2. data： 【String / Data】用于指定事件中携带的数据；   
3. callback: 【Function】用于指定当对象确认接收到数据时调用的回调函数；  