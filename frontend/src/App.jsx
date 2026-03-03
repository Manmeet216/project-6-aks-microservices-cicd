import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3002/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:3003/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchProducts().catch(console.error);
    fetchOrders().catch(console.error);
  }, []);

  const login = async () => {
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.token) {
      setToken(data.token);
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  };

  const createOrder = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    // Create a simple order using first product
    const firstProduct = products[0];
    if (!firstProduct) {
      alert("No products available");
      return;
    }

    const res = await fetch("http://localhost:3003/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "u1",
        productId: firstProduct.id,
        quantity: 1,
      }),
    });

    const data = await res.json();
    alert(data.message || "Order created");

    // Refresh orders list
    fetchOrders().catch(console.error);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Project 6 - Microservices Demo</h1>

      <h2>Login</h2>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={login}>Login</button>

      {token && <p>✅ Logged in with token: {token}</p>}

      <hr />

      <h2>Products</h2>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} - ${p.price}
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>Orders</h2>
      <button onClick={createOrder}>Create Order (1st Product)</button>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((o) => (
            <li key={o.id}>
              Order {o.id} → user {o.userId} bought {o.productId} (qty {o.quantity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;