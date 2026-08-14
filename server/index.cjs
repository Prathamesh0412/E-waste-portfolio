const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ewaste2026secure';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files for uploads
app.use('/uploads', express.static(uploadsDir));

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and PDF are allowed.'));
    }
  }
});

// Database Setup (better-sqlite3 is synchronous)
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Initialize database table
db.exec(`
  CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignment_number INTEGER,
    title TEXT,
    category TEXT,
    description TEXT,
    date TEXT,
    tags TEXT,
    learning_outcomes TEXT,
    content TEXT,
    preview_image TEXT,
    pdf_file TEXT,
    status TEXT DEFAULT 'draft',
    created_at TEXT,
    updated_at TEXT
  )
`);
console.log('Database initialized');

// JWT Auth Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Failed to authenticate token' });
  }
};

// ─── AUTH ROUTES ───

app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Login attempt! Received: '${username}' / '${password}'`);
    console.log(`Expected: '${ADMIN_USERNAME}' / '${ADMIN_PASSWORD}'`);

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      console.log('Credentials did not match!');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: 1, username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── ASSIGNMENT ROUTES ───

// Get all assignments (public sees published, admin sees all)
app.get('/api/assignments', (req, res) => {
  const authHeader = req.headers['authorization'];
  let isAdmin = false;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, JWT_SECRET);
      isAdmin = true;
    } catch (e) {
      // Not admin
    }
  }

  try {
    const query = isAdmin
      ? 'SELECT * FROM assignments ORDER BY assignment_number ASC'
      : "SELECT * FROM assignments WHERE status = 'published' ORDER BY assignment_number ASC";

    const rows = db.prepare(query).all();
    res.json(rows);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// Get single assignment
app.get('/api/assignments/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM assignments WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(row);
  } catch (err) {
    console.error('Error fetching assignment:', err);
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
});

// Create assignment
app.post('/api/assignments', verifyToken, upload.fields([
  { name: 'preview_image', maxCount: 1 },
  { name: 'pdf_file', maxCount: 1 }
]), (req, res) => {
  try {
    const {
      assignment_number, title, category, description, date,
      tags, learning_outcomes, content, status
    } = req.body;

    const now = new Date().toISOString();
    let preview_image = null;
    let pdf_file = null;

    if (req.files) {
      if (req.files.preview_image && req.files.preview_image.length > 0) {
        preview_image = `/uploads/${req.files.preview_image[0].filename}`;
      }
      if (req.files.pdf_file && req.files.pdf_file.length > 0) {
        pdf_file = `/uploads/${req.files.pdf_file[0].filename}`;
      }
    }

    const stmt = db.prepare(`
      INSERT INTO assignments (
        assignment_number, title, category, description, date,
        tags, learning_outcomes, content, preview_image, pdf_file,
        status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      assignment_number, title, category, description, date,
      tags, learning_outcomes, content, preview_image, pdf_file,
      status || 'draft', now, now
    );

    res.status(201).json({ id: result.lastInsertRowid, message: 'Assignment created successfully' });
  } catch (err) {
    console.error('Error creating assignment:', err);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
});

// Update assignment
app.put('/api/assignments/:id', verifyToken, upload.fields([
  { name: 'preview_image', maxCount: 1 },
  { name: 'pdf_file', maxCount: 1 }
]), (req, res) => {
  try {
    const { id } = req.params;
    const {
      assignment_number, title, category, description, date,
      tags, learning_outcomes, content, status
    } = req.body;

    const now = new Date().toISOString();

    // Get current file paths
    const existing = db.prepare('SELECT preview_image, pdf_file FROM assignments WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    let preview_image = existing.preview_image;
    let pdf_file = existing.pdf_file;

    if (req.files) {
      if (req.files.preview_image && req.files.preview_image.length > 0) {
        preview_image = `/uploads/${req.files.preview_image[0].filename}`;
      }
      if (req.files.pdf_file && req.files.pdf_file.length > 0) {
        pdf_file = `/uploads/${req.files.pdf_file[0].filename}`;
      }
    }

    db.prepare(`
      UPDATE assignments SET
        assignment_number = ?, title = ?, category = ?, description = ?,
        date = ?, tags = ?, learning_outcomes = ?, content = ?,
        preview_image = ?, pdf_file = ?, status = ?, updated_at = ?
      WHERE id = ?
    `).run(
      assignment_number, title, category, description, date,
      tags, learning_outcomes, content, preview_image, pdf_file,
      status || 'draft', now, id
    );

    res.json({ message: 'Assignment updated successfully' });
  } catch (err) {
    console.error('Error updating assignment:', err);
    res.status(500).json({ error: 'Failed to update assignment' });
  }
});

// Delete assignment
app.delete('/api/assignments/:id', verifyToken, (req, res) => {
  try {
    const result = db.prepare('DELETE FROM assignments WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    console.error('Error deleting assignment:', err);
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
});

// Error handling for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
});

// Serve React Frontend in Production
const clientBuildPath = path.join(__dirname, '../dist');
app.use(express.static(clientBuildPath));

// Catch-all route to serve React's index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
