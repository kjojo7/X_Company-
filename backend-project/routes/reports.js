const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { requireAdmin } = require('../middleware/auth');

// GET report - filter employees by date range (HireDate)
router.get('/', requireAdmin, async (req, res) => {
  const { startDate, endDate, department } = req.query;
  try {
    let query = `SELECT e.*, p.PostName 
                 FROM mk_employees e 
                 LEFT JOIN mk_post p ON e.PostID = p.PostID
                 WHERE 1=1`;
    const params = [];

    if (startDate) {
      query += ` AND e.HireDate >= ?`;
      params.push(startDate);
    }
    if (endDate) {
      query += ` AND e.HireDate <= ?`;
      params.push(endDate);
    }
    if (department && department !== 'all') {
      query += ` AND e.Department = ?`;
      params.push(department);
    }
    query += ` ORDER BY e.HireDate DESC`;

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
