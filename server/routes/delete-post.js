const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

// 기본 라우트
router.get("/", (req, res) => {
  res.send("Welcome to SEE Dividend API Server");
});

/**
 * Delete post route handler
 * DELETE /delete-post
 */
router.delete("/", (req, res) => {
  const { slug } = req.query;
  console.log(slug);

  if (!slug) {
    return res.status(400).json({ message: "Post slug is required" });
  }

  try {
    // Get the absolute path to the _posts directory using __dirname instead of process.cwd()
    const postsDirectory = path.join(__dirname, "../../_posts");

    console.log(`Looking for posts in directory: ${postsDirectory}`);

    if (!fs.existsSync(postsDirectory)) {
      return res.status(404).json({ message: `Posts directory not found: ${postsDirectory}` });
    }

    // Function to search for the file recursively
    const findPostFile = (dir) => {
      let result = null;
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          // Recursively search subdirectories
          const found = findPostFile(fullPath);
          if (found) {
            result = found;
            break;
          }
        } else if (stats.isFile()) {
          // Check if the file matches either ${slug}.md or YYYY-MM-DD-${slug}.md pattern
          const isExactMatch = item === `${slug}.md`;
          const isDatePrefixedMatch =
            /^\d{4}-\d{2}-\d{2}-(.+)\.md$/.test(item) && item.replace(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/, "$1") === slug;

          if (isExactMatch || isDatePrefixedMatch) {
            result = fullPath;
            break;
          }
        }
      }

      return result;
    };

    // Find the post file recursively
    const postFilePath = findPostFile(postsDirectory);
    console.log(`Searching for file with slug: ${slug}, found: ${postFilePath}`);

    if (!postFilePath) {
      return res.status(404).json({ message: `Post file with slug "${slug}" not found` });
    }

    // Delete the file
    fs.unlinkSync(postFilePath);
    console.log(`Deleted file: ${postFilePath}`);

    return res.status(200).json({
      message: "Post deleted successfully",
      deletedFile: path.relative(postsDirectory, postFilePath),
    });
  } catch (error) {
    console.error("Error deleting post file:", error);
    return res.status(500).json({
      message: "Internal server error while deleting the post file",
      error: error.message,
    });
  }
});

module.exports = router;
