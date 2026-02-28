function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-logo">Sai Shoes</p>
          <p className="muted">Luxury footwear crafted for everyday distinction.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <p className="muted">New Arrivals</p>
          <p className="muted">Men</p>
          <p className="muted">Women</p>
          <p className="muted">Sale</p>
        </div>
        <div>
          <h4>Support</h4>
          <p className="muted">Shipping & Returns</p>
          <p className="muted">Track Order</p>
          <p className="muted">FAQ</p>
          <p className="muted">Contact</p>
        </div>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} Sai Shoes. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
