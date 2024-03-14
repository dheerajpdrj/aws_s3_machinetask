const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  mimeType: { type: String, required: true },
  filePath: { type: String, required: true },
  bucket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bucket",
    required: true,
  },
});

module.exports = mongoose.model("Object", objectSchema);
