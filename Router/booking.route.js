const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { Booking } = require("../model/booking.model");

const bookingRoute = express.Router();

bookingRoute.post("/booking", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    booking.save();
    res.status(201).json({ msg: "you have booked a flight" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
bookingRoute.get("/dashboard", async (req, res) => {
  try {
    const dashbord = await Booking.find().populate("user").populate("flight");
    res.status(200).json({ msg: "all detail", dashbord: dashbord });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

bookingRoute.put("/dashboard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dashbord = await Booking.findByIdAndUpdate(id, req.body);
    res.status(204).json({ msg: "updated dashbord detailes" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

bookingRoute.delete("/dashboard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dashbord = await Booking.findByIdAndDelete(id);
    res.status(202).json({ msg: "deleted booking detailes" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { bookingRoute };
