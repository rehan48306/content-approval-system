const db = require("../db");

// CREATE
exports.createContent = (req, res) => {
    const { title, description } = req.body;

    const role = req.headers.role;

    if (role !== "CREATOR") {
        return res.status(403).send("You're not allowed perform this action");
    }

    db.run(
        `INSERT INTO content (title, description, status, created_by, updated_at)
     VALUES (?, ?, 'DRAFT', 'CREATOR', datetime('now'))`,
        [title, description],
        function (err) {
            if (err) return res.status(500).send(err);
            res.send({ id: this.lastID });
        }
    );
};

// GET ALL
exports.getAllContent = (req, res) => {
  const role = req.headers.role;

  if (!role) {
    return res.status(400).send("Role is required");
  }

  let query = `SELECT * FROM content`;

  // Filter drafts for non-creators
  if (role !== "CREATOR") {
    query += ` WHERE status != 'DRAFT'`;
  }

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.send(rows);
  });
};

// EDIT
exports.editContent = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    db.get(`SELECT * FROM content WHERE id = ?`, [id], (err, row) => {

         if (err) return res.status(500).send(err);
         if (!row) return res.status(404).send("Content not found");

        if (row.status === "APPROVED") {
            return res.status(400).send("Cannot edit approved content");
        }

        if (row.status === "REVIEW_1" || row.status === "REVIEW_2") {
            return res.status(400).send("Cannot edit content during review");
        }        

        db.run(
            `UPDATE content SET title=?, description=?, updated_at=datetime('now') WHERE id=?`,
            [title, description, id],
            function (err) {
                if (err) return res.status(500).send(err);
                res.send("Updated");
            }
        );
    });
};

// SUBMIT
exports.submitContent = (req, res) => {
    const { id } = req.params;
    const role = req.headers.role;

    // 🔐 Role validation
    if (role !== "CREATOR") {
        return res.status(403).send("Only creator can submit content");
    }

    db.get(`SELECT * FROM content WHERE id=?`, [id], (err, row) => {

        if (err) return res.status(500).send(err);
        if (!row) return res.status(404).send("Content not found");

        // 🚫 Only draft can be submitted
        if (row.status !== "DRAFT") {
            return res.status(400).send("Only draft content can be submitted");
        }

        db.run(
            `UPDATE content SET status='REVIEW_1' WHERE id=?`,
            [id],
            function (err) {
                if (err) return res.status(500).send(err);
                res.send("Moved to REVIEW_1");
            }
        );
    });
};

// APPROVE
exports.approveContent = (req, res) => {
  const { id } = req.params;
  const role = req.headers.role;
  const { comment } = req.body; // optional

  db.get(`SELECT * FROM content WHERE id=?`, [id], (err, row) => {

    if (err) return res.status(500).send(err);
    if (!row) return res.status(404).send("Not found");

    // 🚫 Creator cannot approve
    if (role === "CREATOR") {
      return res.status(403).send("Creator cannot approve");
    }

    // 🚫 Prevent invalid states
    if (!["REVIEW_1", "REVIEW_2"].includes(row.status)) {
      return res.status(400).send("Content is not in a review stage");
    }

    // 🎯 Stage-based validation
    if (row.status === "REVIEW_1" && role !== "REVIEWER_1") {
      return res.status(403).send("Only Reviewer 1 allowed");
    }

    if (row.status === "REVIEW_2" && role !== "REVIEWER_2") {
      return res.status(403).send("Only Reviewer 2 allowed");
    }

    const newStatus =
      row.status === "REVIEW_1" ? "REVIEW_2" : "APPROVED";

    // 📝 Insert approval log
    db.run(
      `INSERT INTO approvals 
       (content_id, stage, reviewer_id, action, comment, created_at)
       VALUES (?, ?, ?, 'APPROVED', ?, datetime('now'))`,
      [id, row.status, role, comment || "Approved"],
      function (err) {
        if (err) return res.status(500).send(err);

        // 🔄 Update status
        db.run(
          `UPDATE content SET status=?, updated_at=datetime('now') WHERE id=?`,
          [newStatus, id],
          function (err) {
            if (err) return res.status(500).send(err);
            res.send(`Moved to ${newStatus}`);
          }
        );
      }
    );
  });
};

// REJECT
exports.rejectContent = (req, res) => {
  const { id } = req.params;
  const role = req.headers.role;
  const { comment } = req.body;

  // 🚫 Creator cannot reject
  if (role === "CREATOR") {
    return res.status(403).send("You're not allowed to perform this action");
  }

  // ❗ Comment is mandatory
  if (!comment || comment.trim() === "") {
    return res.status(400).send("Comment is required for rejection");
  }

  db.get(`SELECT * FROM content WHERE id=?`, [id], (err, row) => {

    if (err) return res.status(500).send(err);
    if (!row) return res.status(404).send("Not found");

    // 🚫 Prevent invalid states
    if (!["REVIEW_1", "REVIEW_2"].includes(row.status)) {
      return res.status(400).send("Content is not in a review stage");
    }

    // 🎯 Stage-based validation
    if (row.status === "REVIEW_1" && role !== "REVIEWER_1") {
      return res.status(403).send("Only Reviewer 1 allowed");
    }

    if (row.status === "REVIEW_2" && role !== "REVIEWER_2") {
      return res.status(403).send("Only Reviewer 2 allowed");
    }

    // 📝 Insert rejection log
    db.run(
      `INSERT INTO approvals 
       (content_id, stage, reviewer_id, action, comment, created_at)
       VALUES (?, ?, ?, 'REJECTED', ?, datetime('now'))`,
      [id, row.status, role, comment],
      function (err) {
        if (err) return res.status(500).send(err);

        // 🔄 Move back to draft
        db.run(
          `UPDATE content SET status='DRAFT', updated_at=datetime('now') WHERE id=?`,
          [id],
          function (err) {
            if (err) return res.status(500).send(err);
            res.send("Rejected and moved to DRAFT");
          }
        );
      }
    );
  });
};

exports.getApprovals = (req, res) => {
    const { id } = req.params;

    const role = req.headers.role;

    if (role === "CREATOR") {
        return res.status(403).send("You're not allowed to view this information");
    }

    db.all(
        `SELECT * FROM approvals WHERE content_id = ? ORDER BY created_at ASC`,
        [id],
        (err, rows) => {
            if (err) return res.status(500).send(err);
            res.send(rows);
        }
    );
};