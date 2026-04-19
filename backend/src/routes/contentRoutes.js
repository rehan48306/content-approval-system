const express = require("express");
const router = express.Router();
const controller = require("../controllers/contentController");

router.post("/", controller.createContent);
router.get("/", controller.getAllContent);
router.put("/:id", controller.editContent);
router.post("/:id/submit", controller.submitContent);
router.post("/:id/approve", controller.approveContent);
router.post("/:id/reject", controller.rejectContent);
router.get("/:id/approvals", controller.getApprovals);

module.exports = router;