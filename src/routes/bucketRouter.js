const express = require('express');
const { createBucket, listBuckets, deleteBucket } = require('../controller/bucketController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/create',authenticate, createBucket);
router.get('/list', authenticate, listBuckets);

module.exports = router;