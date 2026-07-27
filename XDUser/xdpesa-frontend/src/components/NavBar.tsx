import { Link } from "react-router-dom";
import type { User } from "../types";

interface NavBarProps {
  currentUser: User | null;
  onLogout: () => void;
}

export default function NavBar({ currentUser, onLogout }: NavBarProps) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <Link className="brand" to="/">
          XDPesa
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          <a className="nav-link" href="#features">
            Features
          </a>
          <a className="nav-link" href="#benefits">
            Benefits
          </a>
          {currentUser ? (
            <>
              <Link className="nav-link nav-secondary" to={currentUser.role === "ADMIN" ? "/admin" : "/dashboard"}>
                Dashboard
              </Link>
              <button className="nav-cta" type="button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-cta" to="/register">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
