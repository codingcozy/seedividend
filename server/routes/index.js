const express = require("express");
const deletePostRouter = require("./delete-post");
const createPostRouter = require("./create-post");
const uploadImageRouter = require("./upload-image");
const publishPostRouter = require("./publish-post");

const router = express.Router();

// Mount the delete post routes
router.use("/delete-post", deletePostRouter);
router.use("/create-post", createPostRouter);
router.use("/upload-image", uploadImageRouter);
router.use("/publish-post", publishPostRouter);

module.exports = router;
