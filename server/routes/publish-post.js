import express from "express";
import { exec } from "child_process";
import util from "util";
import path from "path";

const router = express.Router();

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
    const deployResult = await execPromise(`bash ${deployScriptPath}`, { cwd: rootDir });

    // Execute git-push script
    console.log("Executing git-push script...");
    const gitPushScriptPath = path.join(rootDir, "scripts", "git-push.sh");
    const gitPushResult = await execPromise(`bash ${gitPushScriptPath}`, { cwd: rootDir });

    res.status(200).json({
      success: true,
      message: "Blog published successfully",
      details: {
        deployStdout: deployResult.stdout,
        deployStderr: deployResult.stderr || null,
        gitPushStdout: gitPushResult.stdout,
        gitPushStderr: gitPushResult.stderr || null,
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

export default router;
