const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io");
const { Chess } = require("chess.js");
const path = require("path");
const { title } = require("process");
const { log } = require("console");
const PORT = 4000;

const server = http.createServer(app);

const io = socket(server);

const chess = new Chess();

let players = {};
let currentPlayer = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "chess game" });
});

io.on("connection", (uniqueSocket) => {
  console.log("connected");

  if(!players.white){
   players.white = uniqueSocket.id;
   uniqueSocket.emit("playerRole","w");
   
  }
  else if(!players.black){
    players.black = uniqueSocket.id;
    uniqueSocket.emit("playerRole","b")
  }
  else
  uniqueSocket.emit("spectatorRole")
uniqueSocket.on("disconnect",()=>{
    if(uniqueSocket.id === players.white)
        delete players.white
    else if( uniqueSocket.id  === players.black)
        delete players.black
})
});

server.listen(PORT, () => {
  console.log(`server is starting on ${PORT}`);
});
