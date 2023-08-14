const express = require("express");

require("dotenv").config();
const { connection } = require("./config/db");
const { userRoute } = require("./Router/user.route");
const { flightRouter } = require("./Router/flight.route");
const { bookingRoute } = require("./Router/booking.route");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("I am Server");
});
// userroute
app.use("/api", userRoute);

// flight routes
app.use("/api", flightRouter);

// bookingRoute
app.use("/api", bookingRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db at port 8000");
  } catch (error) {
    console.log("not connected to db");
  }
});
