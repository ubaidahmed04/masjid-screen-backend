const express = require("express")
const cors = require("cors");
const { ENV } = require("./constants/index.js");
const UserRoute = require("./routes/user.route.js");
const connectDB = require("./config/db.js");
const ScheduleRoute = require("./routes/schedule.route.js");
const QRRoute = require("./routes/qrcode.route.js")
const DuaRoute = require("./routes/dua.route.js");
const app = express()
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
connectDB()

// const io = new Server(server, {
//   cors: {
//     origin: '*', // or specify your frontend domain
//   },
// });
// module.exports = { server, io };
const { init } = require('./constants/socket.js');
const io = init(server);


// When client connects
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Optional: join room by UID sent from frontend
  socket.on('joinRoom', (UID) => {
    socket.join(UID);
    console.log(`Socket ${socket.id} joined room ${UID}`);
  });
});
app.use(express.json());
// const corsOptions = {
//   origin: ['http://192.168.100.12:5173',''],
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);  // Allow all origins dynamically
  },
  credentials: true
}));

// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174','http://192.168.1.10:5173','https://masjid-screen-phi.vercel.app'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true,
// }));


app.get("/", (req, res) => {
    res.status(200).send({ message: 'Server is up and running' });
});

app.use("/api/auth",UserRoute)
app.use("/api",ScheduleRoute(io))
app.use("/api",DuaRoute(io))
app.use("/api",QRRoute)

// Start Server
server.listen(ENV.PORT, () => {
    console.log(`Server running on this  http://localhost:${ENV.PORT}`);
});
  