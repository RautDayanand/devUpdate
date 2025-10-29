import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div className="container">
      <a className="navbar-brand fw-bold" href="#">DevTracker</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Technologies</a></li>
          <li className="nav-item"><a className="nav-link" href="#">About</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
