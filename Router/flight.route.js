const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { Flight } = require("../model/flight.model");

const flightRouter = express.Router();

// get all flight
flightRouter.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json({ msg: "all flights are here", data: flights });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

flightRouter.get("/flights/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const flight = await Flight.findOne({ _id: id });
    if (!flight) {
      return res.status(400).json({ msg: "flight not found" });
    }

    res.status(200).json({ msg: "particular flight", flight: flight });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// post route
flightRouter.post("/flights", async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json({ msg: "Added new  flight", flight: flight });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

flightRouter.put("/flights/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findByIdAndUpdate(id, req.body);
    res.status(204).json({ msg: "updated flight detailes" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

flightRouter.delete("/flights/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findByIdAndDelete(id);
    res.status(202).json({ msg: "deleted flight detailes" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { flightRouter };
