const express = require("express")
const cors = require("cors");
const { ENV } = require("./constants/index.js");
const UserRoute = require("./routes/user.route.js");
const connectDB = require("./config/db.js");
const ScheduleRoute = require("./routes/schedule.route.js");
const DuaRoute = require("./routes/dua.route.js");
const app = express()
connectDB()

app.use(express.json());
// const corsOptions = {
//   origin: ['http://192.168.100.12:5173',''],
//   credentials: true,
// };
// app.use(cors(corsOptions));
const allowedOrigins = ['http://localhost:5173', 'http://192.168.1.10:5173','https://masjid-screen-phi.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}));


app.get("/", (req, res) => {
    res.status(200).send({ message: 'Server is up and running' });
});

app.use("/api/auth",UserRoute)
app.use("/api",ScheduleRoute)
app.use("/api",DuaRoute)

// Start Server
app.listen(ENV.PORT, () => {
    console.log(`Server running on http://localhost:${ENV.PORT}`);
});
  