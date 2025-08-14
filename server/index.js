"use strict"
/* -------------------------------------------------------
               Event APP
------------------------------------------------------- */
const express = require('express')
const http= require("http")
const { Server } = require("socket.io");
const cors = require("cors")
const app = express()
app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST", "PUT", "PATCH", "HEAD", "DELETE", "OPTIONS"]
    }
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Odaya katılma
  socket.on("room", (chatId) => {
    socket.join(chatId);  
    console.log(`User ${socket.id} joined room ${chatId}`);
  });

  // Mesaj gönderme
  socket.on("message", (data) => {
    console.log("Incoming message:", data);

    

    // chatId üzerinden ilgili odaya gönder
    io.to(data.chatId).emit("messageReturn", data);

  });

  // Bağlantı koptuğunda
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});    


/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */


// Middlewares:

// Accept JSON:
app.use(express.json());

// Cors
app.use(require('cors')());

// Call static uploadFile:
app.use('/upload', express.static('./upload'));

// Check Authentication:
 app.use(require('./src/middlewares/authentication'));

// Run Logger:
app.use(require('./src/middlewares/logger'));

// res.getModelList():
app.use(require('./src/middlewares/queryHandler'));

//socket.io
//app.use(require("./src/middlewares/socketIo"))

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to Event Management API',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
});

// Routes:
app.use(require('./src/routes'));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
server.listen(PORT, () => console.log(`http://${HOST}:${PORT}`))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.

