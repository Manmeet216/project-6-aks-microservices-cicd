const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory orders for demo
let ORDERS = [
  { id: "o1", userId: "u1", productId: "p1", quantity: 1 }
];

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/orders", (req, res) => {
  res.json(ORDERS);
});

app.post("/orders", (req, res) => {
  const { userId, productId, quantity } = req.body || {};

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "userId, productId, quantity are required" });
  }

  const newOrder = {
    id: `o${ORDERS.length + 1}`,
    userId,
    productId,
    quantity
  };

  ORDERS.push(newOrder);

  return res.json({ message: "Order created", orderId: newOrder.id });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`order-service running on port ${PORT}`);
});