import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Profile
      </NavLink>

      <NavLink
        to="/dashboard"
        style={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    padding: "15px",
    backgroundColor: "#1f2937",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  active: {
    color: "#38bdf8",
    textDecoration: "underline",
    fontSize: "18px",
  },
};


export default Navbar;
