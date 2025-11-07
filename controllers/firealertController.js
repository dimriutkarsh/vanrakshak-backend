const FireAlert = require('../models/fireData');

// API: POST /api/fire-alert
const fireAlert = async (req, res) => {
  try {
    const { deviceId, isfire, longitude, latitude, humidity, temp, smoke } = req.body;

    if (typeof isfire !== "boolean" || typeof longitude !== "number" || typeof latitude !== "number") {
      return res.status(400).json({ error: "Invalid format" });
    }

    // update if exists, else create
    const updatedDevice = await FireAlert.findOneAndUpdate(
      { deviceId },
      { isfire, longitude, latitude, humidity, temp, smoke, lastUpdate: new Date() },
      { upsert: true, new: true }   // insert if not exists
    );

    // If fire detected, trigger alert here
    if (isfire) {
      console.log(`🔥 ALERT from ${deviceId} at (${latitude}, ${longitude})`);
      // you can add SMS/Email/WebSocket notification here
    }

    res.status(201).json({
      success: true,
      message: isfire ? " Fire alert detected!" : "Data updated",
      alert: updatedDevice
    });
  } catch (error) {
    res.status(500).json({ error: "Server error while saving data", details: error.message });
  }
};

// API: GET /api/fire-alert
const getFireAlert = async (req, res) => {
  try {
    const alertData = await FireAlert.find();
    res.status(200).json({ success: true, devices: alertData });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error while fetching data" });
  }
};

module.exports = { getFireAlert, fireAlert };
