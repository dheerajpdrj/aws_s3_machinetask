const Bucket = require("../models/bucket");
const Object = require("../models/object");

exports.uploadObject = async (req, res) => {
    try {
      const username = req.user.username;
      const { bucketId } = req.params;
      const bucket = await Bucket.findById(bucketId).populate("owner");
      if (!bucket) {
        return res.status(404).json({ message: "Bucket not found" });
      }
      if (bucket.owner.username !== username) {
        return res
          .status(403)
          .json({ message: "You are not authorized to upload to this bucket" });
      }
      
      const uploadedObjects = [];
      for (const file of req.files) {
        const { mimetype, originalname, path } = file;
        const newObject = new Object({
          fileName: originalname,
          mimeType: mimetype,
          filePath: path,
          bucket: bucket._id,
        });
        const object = await newObject.save();
        uploadedObjects.push(object);
      }
      await bucket.updateOne({ $push: { object: { $each: uploadedObjects } } });
  
      res.status(201).json({ message: "Objects uploaded successfully", objects: uploadedObjects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
exports.getObject = async (req, res) => {
  try {
    const { bucketId, objectId } = req.params;
    const bucket = await Bucket.findById(bucketId);
    if (!bucket) {
      return res.status(404).json({ message: "Bucket not found" });
    }

    if (bucket.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to access objects in this bucket",
      });
    }

    const object = await Object.findById(objectId);
    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }

    if (object.bucket.toString() !== bucketId) {
      return res
        .status(404)
        .json({ message: "Object not found in this bucket" });
    }

    res.json(object);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listObjects = async (req, res) => {
  try {
    const { bucketId } = req.params;
    const bucket = await Bucket.findById(bucketId);
    if (!bucket) {
      return res.status(404).json({ message: "Bucket not found" });
    }

    if (bucket.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to access objects in this bucket",
      });
    }

    const objects = await Object.find({ bucket: bucketId });
    res.json(objects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteObject = async (req, res) => {
  try {
    const { bucketId, objectId } = req.params;
    const bucket = await Bucket.findById(bucketId);
    if (!bucket) {
      return res.status(404).json({ message: "Bucket not found" });
    }
    if (bucket.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete objects in this bucket",
      });
    }

    const object = await Object.findById(objectId);
    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }

    await object.deleteOne();
    res.json({ message: "Object deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
