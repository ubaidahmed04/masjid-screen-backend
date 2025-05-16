const crypto = require("crypto");

const SECRET_KEY = process.env.JWT_SECRET
console.log(SECRET_KEY); // Use 16, 24 or 32 chars for AES
const IV = crypto.randomBytes(16); // 16 bytes IV for AES-256-CBC

function encrypt(text) {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY.padEnd(32)), IV);
  let encrypted = cipher.update(text.toString(), "utf-8", "hex");
  encrypted += cipher.final("hex");

  // Secure hash and short-code (6–12 chars)
  const hash = crypto.createHash("sha256").update(encrypted).digest("hex");
  const shortCode = hash.substring(0, 10); // 👈 10 characters (change to 6–12 if needed)

  return shortCode;
}

function decrypt(code) {
  // Since short hash is not reversible, we can't decrypt from shortCode.
  // We’ll find the original serialNo from DB by matching code.
  throw new Error("Direct decryption is not possible from short hash. Use DB lookup.");
}

module.exports = { encrypt };
