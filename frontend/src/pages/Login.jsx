import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../api/auth";

const COLORS = {
  cream: "#F5F0E8",
  black: "#0D0D0D",
  gold: "#C9A84C",
  goldDark: "#8B6914",
  muted: "#6B6355",
  border: "rgba(201,168,76,0.25)",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  const rolePathMap = {
    citizen: "/citizen/my-complaints",
    admin: "/admin/dashboard",
    dept_admin: "/admin/dashboard",
    worker: "/worker/tasks",
    field_worker: "/worker/tasks",
    superadmin: "/superadmin/dashboard",
    super_admin: "/superadmin/dashboard",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      const response = await loginRequest(email, password);
      const { id, name, role, access_token } = response.data;

      loginWithToken(access_token, { name, id, email, role }, role);
      navigate(rolePathMap[role] || "/");
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.cream,
        padding: "70px 24px 24px 24px",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>

      <div
        style={{
          maxWidth: "440px",
          width: "100%",
          background: "#FFFFFF",
          border: `1px solid ${COLORS.border}`,
          padding: "48px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ width: "48px", height: "1px", background: COLORS.gold, margin: "0 auto 32px" }} />
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 700, color: COLORS.black, textAlign: "center", marginBottom: "8px" }}>
          Welcome Back
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.muted, textAlign: "center", marginBottom: "40px" }}>
          Sign in to your account
        </p>

        {error && (
          <div style={{ background: "rgba(220,38,38,0.1)", color: "#DC2626", padding: "12px 16px", borderRadius: "4px", marginBottom: "24px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.goldDark, display: "block", marginBottom: "8px" }}>
              Email Address
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", height: "48px", background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.gold}`, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.black, padding: "0 0 8px 0", transition: "all 0.3s ease", outline: "none" }} onFocus={(e) => (e.target.style.borderBottomColor = COLORS.goldDark)} onBlur={(e) => (e.target.style.borderBottomColor = COLORS.gold)} placeholder="your@email.com" />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.goldDark, display: "block", marginBottom: "8px" }}>
              Password
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", height: "48px", background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.gold}`, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.black, padding: "0 0 8px 0", transition: "all 0.3s ease", outline: "none" }} onFocus={(e) => (e.target.style.borderBottomColor = COLORS.goldDark)} onBlur={(e) => (e.target.style.borderBottomColor = COLORS.gold)} placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} style={{ width: "100%", height: "52px", background: COLORS.black, color: COLORS.gold, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s ease", opacity: loading ? 0.7 : 1, marginTop: "8px" }} onMouseEnter={(e) => { if (!loading) { e.target.style.background = COLORS.gold; e.target.style.color = COLORS.black; } }} onMouseLeave={(e) => { if (!loading) { e.target.style.background = COLORS.black; e.target.style.color = COLORS.gold; } }} >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.muted, marginTop: "24px" }}>
          Don't have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/register"); }} style={{ color: COLORS.goldDark, textDecoration: "none", fontWeight: 600, cursor: "pointer" }} onMouseEnter={(e) => (e.target.style.textDecoration = "underline")} onMouseLeave={(e) => (e.target.style.textDecoration = "none")} >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
