const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const util = require("util");
const path = require("path");

const execPromise = util.promisify(exec);

/**
 * POST /api/publish-post
 * Handles blog publishing by executing git commands and deploy script
 */
router.post("/", async (req, res) => {
  try {
    console.log("Starting blog publication process...");

    // Get the root directory of the project
    const rootDir = path.resolve(process.cwd());
    console.log(`Working directory: ${rootDir}`);

    // Execute deploy script
    console.log("Executing deploy script...");
    const deployScriptPath = path.join(rootDir, "scripts", "deploy.sh");

    const { stdout, stderr } = await execPromise(`bash ${deployScriptPath}`, { cwd: rootDir });

    res.status(200).json({
      success: true,
      message: "Blog published successfully",
      details: {
        stdout,
        stderr: stderr || null,
      },
    });
  } catch (error) {
    console.error("Error publishing blog:", error);

    res.status(500).json({
      success: false,
      message: "Failed to publish blog",
      error: error.message || "Unknown error",
      details: error.stderr || null,
    });
  } finally {
    console.log("Blog publication process completed.");
  }
});

module.exports = router;
