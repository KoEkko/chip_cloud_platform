import express from "express";
import { WebSocketServer } from "ws";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.get("/", (req, res) => {
	res.send("hello world");
});
app.listen(port, () => console.log(`example app listening on port ${port}`));

const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", function connection(ws) {
	ws.on("error", console.error);
	ws.on("message", function message(data) {
		console.log(`客户端发送过来的消息${data}`);
	});
	ws.send("服务端发送的消息");
});
