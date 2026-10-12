
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">YOUR PERSONAL PRODUCTIVITY SPACE</p>

        <h1>
          Plan your day.
          <br />
          Achieve your goals.
        </h1>

        <p className="hero-text">
          Organize your work, track your progress, and make every day count.
        </p>

        <Link to="/tasks" className="primary-button">
          Manage My Tasks
        </Link>
      </section>

      <section className="info-grid">
        <article className="info-card">
          <span>01</span>
          <h2>Stay Organized</h2>
          <p>Keep your daily tasks in one convenient place.</p>
        </article>

        <article className="info-card">
          <span>02</span>
          <h2>Track Progress</h2>
          <p>Mark completed tasks and see your progress.</p>
        </article>

        <article className="info-card">
          <span>03</span>
          <h2>Reach Your Goals</h2>
          <p>Break your goals into smaller, manageable actions.</p>
        </article>
      </section>
    </main>
  );
}
