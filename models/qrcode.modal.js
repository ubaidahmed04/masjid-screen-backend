const mongoose = require("mongoose");

const QRCodeSchema = new mongoose.Schema({
  serialNo: {
    type: String,
    required: true,
    unique: true,
  },
  encryptedCode: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 12,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("QRCode", QRCodeSchema);
