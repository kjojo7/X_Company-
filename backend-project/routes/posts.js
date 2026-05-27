const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { requireAdmin } = require('../middleware/auth');

// GET all posts
router.get('/', requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM mk_post ORDER BY PostID DESC`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create post
router.post('/', requireAdmin, async (req, res) => {
  const { PostName } = req.body;
  if (!PostName || !PostName.trim()) {
    return res.status(400).json({ message: 'PostName is required.' });
  }
  try {
    const [result] = await db.query(`INSERT INTO mk_post (PostName) VALUES (?)`, [PostName.trim()]);
    res.status(201).json({ message: 'Post created.', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update post
router.put('/:id', requireAdmin, async (req, res) => {
  const { PostName } = req.body;
  try {
    await db.query(`UPDATE mk_post SET PostName=? WHERE PostID=?`, [PostName, req.params.id]);
    res.json({ message: 'Post updated.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE post
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await db.query(`DELETE FROM mk_post WHERE PostID=?`, [req.params.id]);
    res.json({ message: 'Post deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
