import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <section className="card landing">
      <h1>Smart P-CRM</h1>
      <p className="muted-text">
        Civic complaint management portal for citizens, workers, admins, and super admins.
      </p>
      <Link to="/login" className="btn btn-primary">
        Continue to Login
      </Link>
    </section>
  );
}
