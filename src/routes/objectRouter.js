const express = require("express");
const multer = require("multer");
const {
  uploadObject,
  listObjects,
  deleteObject,
  getObject,
} = require("../controller/objectController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
});
const upload = multer({ storage });

router.post("/:bucketId", authenticate, upload.array("files", 5), uploadObject);
router.get("/:bucketId", authenticate, listObjects);
router.get("/:bucketId/:objectId", authenticate, getObject);
router.delete("/:bucketId/:objectId", authenticate, deleteObject);


module.exports = router;
