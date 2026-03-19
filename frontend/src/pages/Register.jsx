import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../api/auth";

const COLORS = {
  cream: "#F5F0E8",
  black: "#0D0D0D",
  gold: "#C9A84C",
  goldDark: "#8B6914",
  muted: "#6B6355",
  border: "rgba(201,168,76,0.25)",
};

const ROLES = [
  { value: "citizen", label: "Citizen" },
  { value: "worker", label: "Field Worker" },
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
        setError("Phone number must be 10 digits");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      await registerRequest(
        formData.name,
        formData.email,
        formData.phone,
        formData.password,
        null,
        formData.role
      );

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.message || "Registration failed");
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
          maxWidth: "480px",
          width: "100%",
          background: "#FFFFFF",
          border: `1px solid ${COLORS.border}`,
          padding: "48px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ width: "48px", height: "1px", background: COLORS.gold, margin: "0 auto 32px" }} />
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 700, color: COLORS.black, textAlign: "center", marginBottom: "8px" }}>
          Join Us
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.muted, textAlign: "center", marginBottom: "40px" }}>
          Create your account to report complaints
        </p>

        {error && (
          <div style={{ background: "rgba(220,38,38,0.1)", color: "#DC2626", padding: "12px 16px", borderRadius: "4px", marginBottom: "24px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", textAlign: "center" }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E", padding: "12px 16px", borderRadius: "4px", marginBottom: "24px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", textAlign: "center" }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.goldDark, display: "block", marginBottom: "8px" }}>
              Full Name
            </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", height: "48px", background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.gold}`, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.black, padding: "0 0 8px 0", transition: "all 0.3s ease", outline: "none" }} onFocus={(e) => (e.target.style.borderBottomColor = COLORS.goldDark)} onBlur={(e) => (e.target.style.borderBottomColor = COLORS.gold)} placeholder="Your full name" />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.goldDark, display: "block", marginBottom: "8px" }}>
              Phone Number
            </label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: "100%", height: "48px", background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.gold}`, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.black, padding: "0 0 8px 0", transition: "all 0.3s ease", outline: "none" }} onFocus={(e) => (e.target.style.borderBottomColor = COLORS.goldDark)} onBlur={(e) => (e.target.style.borderBottomColor = COLORS.gold)} placeholder="10-digit phone number" />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.goldDark, display: "block", marginBottom: "8px" }}>
              Email Address
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", height: "48px", background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.gold}`, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.black, padding: "0 0 8px 0", transition: "all 0.3s ease", outline: "none" }} onFocus={(e) => (e.target.style.borderBottomColor = COLORS.goldDark)} onBlur={(e) => (e.target.style.borderBottomColor = COLORS.gold)} placeholder="your@email.com" />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.goldDark, display: "block", marginBottom: "8px" }}>
              Password
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ width: "100%", height: "48px", background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.gold}`, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.black, padding: "0 0 8px 0", transition: "all 0.3s ease", outline: "none" }} onFocus={(e) => (e.target.style.borderBottomColor = COLORS.goldDark)} onBlur={(e) => (e.target.style.borderBottomColor = COLORS.gold)} placeholder="••••••••" />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.goldDark, display: "block", marginBottom: "8px" }}>
              Confirm Password
            </label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={{ width: "100%", height: "48px", background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.gold}`, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.black, padding: "0 0 8px 0", transition: "all 0.3s ease", outline: "none" }} onFocus={(e) => (e.target.style.borderBottomColor = COLORS.goldDark)} onBlur={(e) => (e.target.style.borderBottomColor = COLORS.gold)} placeholder="••••••••" />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.goldDark, display: "block", marginBottom: "8px" }}>
              Role
            </label>
            <select name="role" value={formData.role} onChange={handleChange} style={{ width: "100%", height: "48px", background: "transparent", border: "none", borderBottom: `1px solid ${COLORS.gold}`, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: COLORS.black, padding: "0 0 8px 0", transition: "all 0.3s ease", outline: "none", cursor: "pointer" }} onFocus={(e) => (e.target.style.borderBottomColor = COLORS.goldDark)} onBlur={(e) => (e.target.style.borderBottomColor = COLORS.gold)}>
              {ROLES.map(role => (
                <option key={role.value} value={role.value} style={{ color: COLORS.black, background: "#FFFFFF" }}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading} style={{ width: "100%", height: "52px", background: COLORS.black, color: COLORS.gold, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s ease", opacity: loading ? 0.7 : 1, marginTop: "8px" }} onMouseEnter={(e) => { if (!loading) { e.target.style.background = COLORS.gold; e.target.style.color = COLORS.black; } }} onMouseLeave={(e) => { if (!loading) { e.target.style.background = COLORS.black; e.target.style.color = COLORS.gold; } }} >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: COLORS.muted, marginTop: "24px" }}>
          Already have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }} style={{ color: COLORS.goldDark, textDecoration: "none", fontWeight: 600, cursor: "pointer" }} onMouseEnter={(e) => (e.target.style.textDecoration = "underline")} onMouseLeave={(e) => (e.target.style.textDecoration = "none")} >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
