// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const colors = {
  bgLight: "#F4F7FB", // SaaS Ice Gray 🔹
  primary: "#3182CE", // Corporate Soft Blue
  success: "#4CAF50", // Green CTA
  white: "#FFFFFF",
  darkText: "#1A1A1A",
  gray: "#4A4A4A",
  borderGray: "#ced4da", // Light Gray for borders
};

const buttonStyles = {
  backgroundColor: colors.primary,
  color: colors.white,
  border: "none",
  transition: "0.25s ease-in-out",
  padding: "8px 16px",
  borderRadius: "6px",
  fontWeight: "500",
  fontSize: "14px",
  cursor: "pointer",
  fontFamily: "inherit",
};
const hoverStyles = { backgroundColor: "#2269b8" };

const inputStyles = {
  border: `1px solid ${colors.borderGray}`,
  borderRadius: "6px",
  padding: "10px 12px", // Consistent padding
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box", // Ensures padding doesn't affect width
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roleRedirectMap = {
    ADMIN: "/Admin/dashboard",
    CARE_WORKER: "/carer/dashboard",
  };

  const dummyUsers = {
    ADMIN: { id: 100, email: "admin@mvp.com", role: "ADMIN" },
    CARE_WORKER: { id: 102, email: "careworker@mvp.com", role: "CARE_WORKER" },
  };

  const handleLogin = async (loginEmail, loginPassword) => {
    setLoading(true);
    setError("");

    const matchedUser = Object.values(dummyUsers).find(
      (user) => user.email === loginEmail && loginPassword === "123456"
    );

    if (matchedUser) {
      const fakeToken = `dev_fake_token_${matchedUser.role}_${Date.now()}`;
      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("userRole", matchedUser.role);
      localStorage.setItem("userEmail", matchedUser.email);
      localStorage.setItem("userId", matchedUser.id);
      navigate(roleRedirectMap[matchedUser.role] || "/");
    } else {
      setError("Invalid credentials. Please check email/password.");
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const fillCredentials = (role) => {
    setEmail(dummyUsers[role].email);
    setPassword("123456");
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{ backgroundColor: colors.bgLight }}
    >
      <div
        className="card shadow w-100"
        style={{ maxWidth: "950px", borderRadius: "1.5rem", backgroundColor: colors.white }}
      >
        <div className="row g-0">
          {/* Left Image - Updated with identity verification image */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://z-cdn-media.chatglm.cn/files/31632b4d-7a2b-469b-9c24-6f74c18e01f9.png?auth_key=1865358687-2f9d6e26bbb444bdac4ffd0b7e681fff-0-2f49de29151e373d21bb709647c31e62"
              alt="Digital identity verification"
              className="img-fluid rounded-start"
              style={{ height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          {/* Right Login Form */}
          <div className="col-md-6 d-flex align-items-center p-5 position-relative">
            {/* Back Button to Landing Page */}
            <button
              className="btn"
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "none",
                border: "none",
                padding: "5px",
                cursor: "pointer",
                color: colors.gray,
              }}
              onClick={() => navigate("/")}
              aria-label="Go back to landing page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ transition: "color 0.2s ease-in-out" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.gray)}
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="w-100">

              <h2 className="fw-bold mb-3 text-center" style={{ color: colors.darkText }}>
                Welcome Back 👋
              </h2>
              <p className="text-center mb-4" style={{ color: colors.gray }}>
                Login to access your dashboard
              </p>

              {error && <div className="alert alert-danger">{error}</div>}

              {/* Quick Login */}
              <p className="text-center fw-semibold" style={{ color: colors.gray }}>
                Quick Login (Developer Mode)
              </p>

              <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                {Object.keys(roleRedirectMap).map((role) => (
                  <button
                    key={role}
                    type="button"
                    className="btn"
                    style={{ ...buttonStyles }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = hoverStyles.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = colors.primary)}
                    onClick={() => fillCredentials(role)}
                    disabled={loading}
                  >
                    {role.replace("_", " ")}
                  </button>
                ))}
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    style={inputStyles}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control pe-5"
                      style={inputStyles}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn position-absolute top-0 end-0 h-100 d-flex align-items-center justify-content-center"
                      style={{
                        border: "none",
                        background: "transparent",
                        paddingRight: "12px",
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  <small style={{ color: colors.gray }}>Default password: 123456</small>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn w-100 py-2"
                  style={{ ...buttonStyles, backgroundColor: colors.primary }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#2269b8")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = colors.primary)}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;