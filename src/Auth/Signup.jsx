import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setIsLoading(true);
    setPasswordMismatch(false);

    try {
      // Simulate signup delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save authentication flag (demo only)
      localStorage.setItem("isAuthenticated", "true");

      // Navigate to dashboard or another route
      navigate("/user/dashboard"); // Change route as needed
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#F4F7FB" }}>
      <div
        className="card shadow-lg w-100"
        style={{ maxWidth: "1000px", borderRadius: "2rem", overflow: "hidden" }}
      >
        <div className="row g-0">
          {/* Left Form Section */}
          <div className="col-12 col-md-6 p-4 p-md-5 text-center">
            {/* Logo with Care Worker text */}
            <div className="d-flex flex-column align-items-center mb-4">
              <h1 className="logo-text mb-1" style={{ 
                fontSize: "1.75rem", 
                fontWeight: "700", 
                color: "#1A1A1A",
                letterSpacing: "-0.5px" 
              }}>
                <span style={{ color: "#3182CE", fontWeight: "800" }}>Care</span> Worker
              </h1>
              <span className="logo-subtitle" style={{ 
                fontSize: "0.75rem", 
                color: "#6B7280", 
                fontWeight: "500" 
              }}>
                Digital Onboarding for Care Workers
              </span>
            </div>

            <h2 className="h5 mb-3" style={{ color: "#1A1A1A", fontWeight: "600" }}>Create an Account</h2>
            <p className="mb-4" style={{ color: "#6B7280" }}>Fill in your details to register</p>

            <form onSubmit={handleSignup}>
              {/* First Name */}
              <div className="mb-3 position-relative">
                <i className="bi bi-person position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#6B7280" }}></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  style={{ borderRadius: "8px", border: "1px solid #D7E2F1", padding: "12px 15px" }}
                />
              </div>

              {/* Last Name */}
              <div className="mb-3 position-relative">
                <i className="bi bi-person-fill position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#6B7280" }}></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  style={{ borderRadius: "8px", border: "1px solid #D7E2F1", padding: "12px 15px" }}
                />
              </div>

              {/* Email */}
              <div className="mb-3 position-relative">
                <i className="bi bi-envelope position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#6B7280" }}></i>
                <input
                  type="email"
                  className="form-control ps-5"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ borderRadius: "8px", border: "1px solid #D7E2F1", padding: "12px 15px" }}
                />
              </div>

              {/* Password */}
              <div className="mb-3 position-relative">
                <i className="bi bi-lock position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#6B7280" }}></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control ps-5 pe-5"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="3"
                  style={{ borderRadius: "8px", border: "1px solid #D7E2F1", padding: "12px 15px" }}
                />
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer`}
                  style={{ color: "#6B7280" }}
                  role="button"
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>

              {/* Confirm Password */}
              <div className="mb-3 position-relative">
                <i className="bi bi-shield-lock position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: "#6B7280" }}></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control ps-5"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ borderRadius: "8px", border: "1px solid #D7E2F1", padding: "12px 15px" }}
                />
              </div>

              {passwordMismatch && (
                <p className="text-danger small mb-3">Passwords do not match</p>
              )}

              {/* Signup Button */}
              <button
                type="submit"
                className="btn w-100 fw-semibold mb-3 d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: "#3182CE", 
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  padding: "12px 0"
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>

            
<div className="text-center">
  <span style={{ color: "#6B7280" }}>Already have an account? </span>
  {/* यहाँ ध्यान दें, Link और to="/login" */}
  <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: "#3182CE" }}>
    Login
  </Link>
</div>

            </form>
          </div>

          {/* Right Image Section */}
          <div className="col-md-6 d-none d-md-block">
            <div className="h-100 position-relative">
              <img
                src="https://z-cdn-media.chatglm.cn/files/de3a1d1f-458f-4568-b16f-50ba6bd21877.png?auth_key=1865348696-fd9b8ea825014b6da8fa0e0b94581c4f-0-f1a4bfadf016c9c8db668dcb121ec35e"
                alt="Care Worker Digital Onboarding"
                className="img-fluid h-100 w-100 object-fit-cover"
                style={{
                  borderTopRightRadius: "2rem",
                  borderBottomRightRadius: "2rem",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;