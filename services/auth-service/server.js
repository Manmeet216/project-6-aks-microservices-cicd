const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory “user” (for demo)
const DEMO_USER = { id: "u1", username: "manmeet", password: "password123" };

// Health check (needed for Kubernetes probes later)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Login (returns a fake token for now)
app.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    return res.json({
      token: "demo-jwt-token",
      user: { id: DEMO_USER.id, username: DEMO_USER.username },
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// Get current user (checks token very simply for demo)
app.get("/me", (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (token !== "demo-jwt-token") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json({ id: DEMO_USER.id, username: DEMO_USER.username });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`auth-service running on port ${PORT}`);
});