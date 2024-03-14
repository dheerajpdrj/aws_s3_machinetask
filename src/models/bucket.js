const mongoose = require("mongoose");

const bucketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  object: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Object", required: true },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Bucket", bucketSchema);
