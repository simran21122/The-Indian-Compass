const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Paths to JSON files
const wishlistPath = path.join(__dirname, "wishlist.json");
const likesPath = path.join(__dirname, "likes.json");

// Utility function: read JSON file
function readJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Utility function: write JSON file
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Wishlist Routes
app.get("/wishlist", (req, res) => {
  const data = readJSON(wishlistPath);
  res.json(data);
});

app.post("/wishlist", (req, res) => {
  const item = req.body;
  let data = readJSON(wishlistPath);

  if (!data.find((p) => p.id === item.id)) {
    data.push(item);
    writeJSON(wishlistPath, data);
  }

  res.json({ message: "Added to wishlist", wishlist: data });
});

app.delete("/wishlist/:id", (req, res) => {
  const id = req.params.id;
  let data = readJSON(wishlistPath);
  data = data.filter((p) => p.id != id);
  writeJSON(wishlistPath, data);
  res.json({ message: "Removed from wishlist", wishlist: data });
});

// Likes Routes
app.get("/likes", (req, res) => {
  const data = readJSON(likesPath);
  res.json(data);
});

app.post("/likes", (req, res) => {
  const item = req.body;
  let data = readJSON(likesPath);

  if (!data.find((p) => p.id === item.id)) {
    data.push(item);
    writeJSON(likesPath, data);
  }

  res.json({ message: "Added to likes", likes: data });
});

app.delete("/likes/:id", (req, res) => {
  const id = req.params.id;
  let data = readJSON(likesPath);
  data = data.filter((p) => p.id != id);
  writeJSON(likesPath, data);
  res.json({ message: "Removed from likes", likes: data });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
