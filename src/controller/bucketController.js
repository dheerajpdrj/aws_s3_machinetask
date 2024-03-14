const Bucket = require("../models/bucket");
const Object = require("../models/object");
const user = require("../models/user");

exports.createBucket = async (req, res) => {
  try {
    const { name } = req.body;
    const existingBucket = await Bucket.findOne({ name });
    if (existingBucket) {
      return res.status(400).json({ message: "Bucket already exists" });
    }
    const username = req.user.username
    const owner = await user.findOne({username});
    const newBucket = new Bucket({ name, owner: owner._id });
    const bucket = await newBucket.save();
    await owner.updateOne({ $push: { bucket: bucket._id } });
    res
      .status(201)
      .json({ message: "Bucket created successfully", bucket: newBucket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listBuckets = async (req, res) => {
  try {
    const data = await user.findOne({ username: req.user.username }).populate("bucket");
    console.log(data);
    res.json(data.bucket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

