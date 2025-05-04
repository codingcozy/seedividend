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

    // Execute git commands
    console.log("Executing git commands...");

    // Checkout main branch
    console.log("Checking out main branch...");
    await execPromise("git checkout main", { cwd: rootDir });

    // Add all changes
    console.log("Adding all changes to git...");
    await execPromise("git add .", { cwd: rootDir });

    // Create commit with current timestamp
    const timestamp = new Date().toISOString();
    const commitMessage = `Publish: ${timestamp}`;
    console.log(`Creating commit: ${commitMessage}`);

    try {
      await execPromise(`git commit -m "${commitMessage}"`, { cwd: rootDir });
    } catch (commitErr) {
      // If there are no changes to commit, this is not necessarily an error
      if (commitErr.stderr && commitErr.stderr.includes("nothing to commit")) {
        console.log("No changes to commit. Continuing with deployment...");
      } else {
        throw commitErr;
      }
    }

    // Execute deploy script
    console.log("Executing deploy script...");
    const deployScriptPath = path.join(rootDir, "scripts", "deploy.sh");

    const { stdout, stderr } = await execPromise(`bash ${deployScriptPath}`, { cwd: rootDir });

    console.log("Deploy script output:", stdout);
    if (stderr) {
      console.log("Deploy script stderr:", stderr);
    }

    res.status(200).json({
      success: true,
      message: "Blog published successfully",
      timestamp,
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
  }
});

module.exports = router;
