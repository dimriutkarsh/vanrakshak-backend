const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true }, // unique per ESP
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  humidity: { type: Number, required: true },
  temp: { type: Number, required: true },
  smoke: { type: Number, required: true },
  isfire: { type: Boolean, required: true },
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FireAlert', alertSchema);
