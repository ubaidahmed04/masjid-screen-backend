const express = require("express");
const router = express.Router();
const QRCode = require("../models/qrcode.modal.js");
const { encrypt } = require("../utils/crypto");

// Create 100 QR codes from 60000000001 to 60000000100
router.get("/generate-qrcodes", async (req, res) => {
  try {
    const baseSerial = 60000000001;
    let inserted = [];

    for (let i = 0; i < 100; i++) {
      const serialNo = (baseSerial + i).toString();

      const exists = await QRCode.findOne({ serialNo });
      if (exists) continue;

      const encryptedCode = encrypt(serialNo);

      if (encryptedCode.length < 6 || encryptedCode.length > 12) {
        console.log("Invalid encrypted code length for:", serialNo);
        continue;
      }

      const newEntry = new QRCode({ serialNo, encryptedCode });
      await newEntry.save();
      inserted.push({ serialNo, encryptedCode });
    }

    res.status(200).json({ message: "QR Codes generated", data: inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Lookup serial number by encrypted code
router.post("/decrypt", async (req, res) => {
  const { encryptedCode } = req.body;

  if (!encryptedCode) {
    return res.status(400).json({ message: "encryptedCode is required" });
  }

  try {
    const record = await QRCode.findOne({ encryptedCode });

    if (!record) {
      return res.status(404).json({ message: "Code not found" });
    }

    res.status(200).json({ serialNo: record.serialNo });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});





// GET all QR codes
router.get("/get-all-qrcodes", async (req, res) => {
  try {
    const qrcodes = await QRCode.find().select("serialNo encryptedCode -_id"); // only show serialNo & encryptedCode
    res.status(200).json(qrcodes);
  } catch (err) {
    console.error("Error fetching QR codes:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
