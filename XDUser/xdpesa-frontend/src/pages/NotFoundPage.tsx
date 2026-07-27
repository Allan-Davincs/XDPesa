import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="notfound-page">
      <section className="notfound-card">
        <h1>404</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="button button-primary" to="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
