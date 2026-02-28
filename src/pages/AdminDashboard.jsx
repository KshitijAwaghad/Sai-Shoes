import { useMemo, useState } from "react";

const emptyForm = {
  name: "",
  brand: "",
  price: "",
  discount: "",
  category: "",
  sizes: "",
  colors: "",
  rating: "",
  image: "",
};

function AdminDashboard({ products, setProducts }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const avgPrice = Math.round(products.reduce((sum, product) => sum + product.price, 0) / totalProducts);
    const brands = new Set(products.map((product) => product.brand)).size;
    return { totalProducts, avgPrice, brands };
  }, [products]);

  const orders = [
    { id: "ORD-1091", customer: "Rahul Verma", amount: 6799, status: "Delivered" },
    { id: "ORD-1092", customer: "Neha Iyer", amount: 3899, status: "Processing" },
    { id: "ORD-1093", customer: "Amit Patel", amount: 9999, status: "Packed" },
    { id: "ORD-1094", customer: "Sana Khan", amount: 2599, status: "Shipped" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: editingId || Date.now(),
      name: form.name,
      brand: form.brand,
      price: Number(form.price),
      discount: Number(form.discount),
      category: form.category,
      sizes: form.sizes.split(",").map((n) => Number(n.trim())),
      colors: form.colors.split(",").map((item) => item.trim()),
      rating: Number(form.rating),
      image: form.image,
      gallery: [form.image, form.image, form.image],
    };

    setProducts((prev) => {
      if (editingId) return prev.map((item) => (item.id === editingId ? payload : item));
      return [payload, ...prev];
    });

    setForm(emptyForm);
    setEditingId(null);
  };

  const onEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      brand: product.brand,
      price: String(product.price),
      discount: String(product.discount),
      category: product.category,
      sizes: product.sizes.join(","),
      colors: product.colors.join(","),
      rating: String(product.rating),
      image: product.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => setProducts((prev) => prev.filter((product) => product.id !== id));

  return (
    <section className="section">
      <div className="container">
        <h2>Admin Dashboard</h2>

        <div className="stats-grid">
          <article className="stat-card">
            <p className="muted tiny">Total Products</p>
            <h3>{stats.totalProducts}</h3>
          </article>
          <article className="stat-card">
            <p className="muted tiny">Average Price</p>
            <h3>₹{stats.avgPrice.toLocaleString("en-IN")}</h3>
          </article>
          <article className="stat-card">
            <p className="muted tiny">Active Brands</p>
            <h3>{stats.brands}</h3>
          </article>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Product" : "Add Product"}</h3>
          <div className="admin-grid">
            <input placeholder="Name" required value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
            <input placeholder="Brand" required value={form.brand} onChange={(e) => setForm((prev) => ({ ...prev, brand: e.target.value }))} />
            <input
              placeholder="Price"
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
            />
            <input
              placeholder="Discount %"
              type="number"
              required
              value={form.discount}
              onChange={(e) => setForm((prev) => ({ ...prev, discount: e.target.value }))}
            />
            <input
              placeholder="Category"
              required
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            />
            <input placeholder="Sizes e.g. 6,7,8" required value={form.sizes} onChange={(e) => setForm((prev) => ({ ...prev, sizes: e.target.value }))} />
            <input
              placeholder="Colors e.g. Black,White"
              required
              value={form.colors}
              onChange={(e) => setForm((prev) => ({ ...prev, colors: e.target.value }))}
            />
            <input
              placeholder="Rating"
              type="number"
              step="0.1"
              min="1"
              max="5"
              required
              value={form.rating}
              onChange={(e) => setForm((prev) => ({ ...prev, rating: e.target.value }))}
            />
            <input
              placeholder="Image URL"
              required
              value={form.image}
              onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
            />
          </div>
          <button className="btn btn-dark">{editingId ? "Update Product" : "Add Product"}</button>
        </form>

        <div className="admin-table-wrap">
          <h3>Product Management</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>₹{product.price.toLocaleString("en-IN")}</td>
                  <td>{product.category}</td>
                  <td className="action-cell">
                    <button onClick={() => onEdit(product)}>Edit</button>
                    <button onClick={() => onDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="orders-wrap">
          <h3>Mock Orders</h3>
          <div className="orders-list">
            {orders.map((order) => (
              <article key={order.id} className="order-item">
                <p>{order.id}</p>
                <p className="muted">{order.customer}</p>
                <p>₹{order.amount.toLocaleString("en-IN")}</p>
                <p>{order.status}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
