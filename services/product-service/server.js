const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCTS = [
  { id: "p1", name: "Laptop", price: 999 },
  { id: "p2", name: "Headphones", price: 199 },
  { id: "p3", name: "Keyboard", price: 79 }
];

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/products", (req, res) => {
  res.json(PRODUCTS);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`product-service running on port ${PORT}`);
});