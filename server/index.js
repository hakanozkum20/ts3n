import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// DB Config
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'ts3',
  password: process.env.DB_PASSWORD || 'b81pvKXSnL',
  database: process.env.DB_NAME || 'ts3',
};

// Admin password (from .env)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

let pool;

async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}

// Login endpoint
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'authenticated' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid password' });
  }
});

// Check auth (simple session-based)
app.post('/api/check', (req, res) => {
  res.json({ success: true });
});

// Add token endpoint
app.post('/api/token', async (req, res) => {
  try {
    const { tokenKey } = req.body;
    const db = await getDB();

    await db.execute(
      `INSERT INTO tokens (server_id, token_key, token_type, token_id1, token_id2, token_created, token_description)
       VALUES (?, ?, ?, ?, ?, UNIX_TIMESTAMP(), ?)`,
      [1, tokenKey, 0, 2, 0, 'Manual admin token']
    );

    res.json({ success: true });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve static files in production (Coolify)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
