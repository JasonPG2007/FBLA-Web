import { useState } from "react";
import { Helmet } from "react-helmet-async";
import InputMask from "react-input-mask";

export default function Authentication() {
  // Variables
  let [isAgreeTerm, setIsAgreeTerm] = useState(false);
  let [isClickShowPasswordSignUp, setIsClickShowPasswordSignUp] =
    useState(false);
  let [isClickShowPasswordSignIn, setIsClickShowPasswordSignIn] =
    useState(false);
  let [isClickShowNewPassword, setIsClickShowNewPassword] = useState(false);
  let [isClickShowConfirmNewPassword, setIsClickShowConfirmNewPassword] =
    useState(false);
  let [isMatchPassword, setIsMatchPassword] = useState(false);
  let [isSentVerificationCodeEmail, setIsSentVerificationCodeEmail] =
    useState(false);
  let [phone, setPhone] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [passwordSignUp, setPasswordSignUp] = useState("");
  let [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState("");
  let [studentId, setStudentId] = useState("");
  let [passwordSignIn, setPasswordSignIn] = useState("");
  let [isClickShowConfirmPassword, setIsClickShowConfirmPassword] =
    useState(false);

  // Functions
  // Handle form submission for Sign Up
  function handleSubmitSignUp(e) {
    e.preventDefault();

    alert("Clicked");
  }

  // Handle form submission for Sign In
  function handleSubmitSignIn(e) {
    e.preventDefault();

    alert("Clicked");
  }

  // Handle form submission for Forgot Password
  function handleSubmitForgotPassword(e) {
    e.preventDefault();

    setIsSentVerificationCodeEmail(true);

    alert("Clicked");
  }

  // Validate Sign Up inputs
  function validateSignUp() {
    if (
      firstName.trim() == "" ||
      lastName.trim() == "" ||
      email.trim() == "" ||
      passwordSignUp.trim() == "" ||
      confirmPasswordSignUp.trim() == "" ||
      !isMatchPassword ||
      !isAgreeTerm
    ) {
      return false;
    } else {
      return true;
    }
  }

  // Validate Sign In inputs
  function validateSignIn() {
    if (studentId.trim() == "" || passwordSignIn.trim() == "") {
      return false;
    } else {
      return true;
    }
  }

  // Check if passwords match
  function checkPasswordMatch(reTypePassword) {
    // Add logic to check if passwords match
    if (passwordSignUp !== reTypePassword) {
      setIsMatchPassword(false);
    } else {
      setIsMatchPassword(true);
    }
  }

  return (
    <>
      {/* Helmet for setting the page title */}
      <Helmet>
        <title>Authentication | Back2Me </title>
      </Helmet>

      <div className="authentication-container">
        <div className="form-box">
          <div
            className="form-sign-up-in-container"
            id="form-sign-up-in-container"
          >
            {/* Sign Up */}
            <form onSubmit={handleSubmitSignUp} style={{ width: "100%" }}>
              <div className="sign-up">
                <h1 style={{ marginBottom: "20px", fontSize: "40px" }}>
                  Sign Up
                </h1>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div className="form-control-authentication">
                    <input
                      type="text"
                      name=""
                      id="first-name"
                      placeholder="Ex: Jason"
                      className="form-control-input"
                      autoFocus
                      required
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        validateSignUp();
                      }}
                    />
                    <label htmlFor="first-name">First Name*</label>
                  </div>
                  <div className="form-control-authentication">
                    <input
                      type="text"
                      name=""
                      id="last-name"
                      placeholder="Ex: PG"
                      className="form-control-input"
                      required
                      onChange={(e) => {
                        setLastName(e.target.value);
                        validateSignUp();
                      }}
                    />
                    <label htmlFor="last-name">Last Name*</label>
                  </div>
                </div>
                <div className="form-control-authentication">
                  <input
                    type="text"
                    name=""
                    id="student-id"
                    placeholder="Ex: 202434567"
                    className="form-control-input"
                    required
                    onChange={(e) => {
                      setStudentId(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "") // Remove non-numeric characters
                        .slice(0, 9); // Allow only numbers, max length 9
                    }}
                  />
                  <label htmlFor="phone">Student ID*</label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type="email"
                    name=""
                    id="email"
                    placeholder="Ex: demo@ex.io"
                    className="form-control-input"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateSignUp();
                    }}
                  />
                  <label htmlFor="email">Email*</label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type={isClickShowPasswordSignUp ? "text" : "password"}
                    name=""
                    id="password"
                    className="form-control-input"
                    placeholder=""
                    required
                    onChange={(e) => {
                      setPasswordSignUp(e.target.value);
                      validateSignUp();
                    }}
                  />
                  {isClickShowPasswordSignUp ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={() => {
                        setIsClickShowPasswordSignUp(
                          !isClickShowPasswordSignUp
                        );
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => {
                        setIsClickShowPasswordSignUp(
                          !isClickShowPasswordSignUp
                        );
                      }}
                    ></i>
                  )}
                  <label htmlFor="password">Password*</label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type={isClickShowConfirmPassword ? "text" : "password"}
                    name=""
                    id="confirm-password"
                    className="form-control-input"
                    placeholder=""
                    required
                    onChange={(e) => {
                      setConfirmPasswordSignUp(e.target.value); // Used to set real password value
                      checkPasswordMatch(e.target.value);
                      validateSignUp();
                    }}
                  />
                  {isClickShowConfirmPassword ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={() => {
                        setIsClickShowConfirmPassword(
                          !isClickShowConfirmPassword
                        );
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => {
                        setIsClickShowConfirmPassword(
                          !isClickShowConfirmPassword
                        );
                      }}
                    ></i>
                  )}
                  <label htmlFor="confirm-password">Confirm Password*</label>
                </div>
                {confirmPasswordSignUp.trim() !== "" && !isMatchPassword && (
                  <div
                    className="form-control-authentication"
                    style={{
                      marginTop: "-15px",
                      justifyContent: "left",
                      color: "red",
                      fontSize: "14px",
                    }}
                  >
                    <p>Confirm password doesn't match</p>
                  </div>
                )}

                {/* Agree Term */}
                <div className="agree-container">
                  <label className="agree-box">
                    <span className="text">
                      Click
                      <a href="#policyModal"> "Terms & Recovery Rules"</a> to
                      read and agree
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  className="btn-authentication"
                  style={{
                    backgroundColor: validateSignUp() ? "#ec7207" : "#d3d3d3",
                    color: validateSignUp() ? "#fff" : "#8c8c8c",
                    cursor: validateSignUp() ? "pointer" : "not-allowed",
                    pointerEvents: validateSignUp() ? "auto" : "none",
                    opacity: validateSignUp() ? 1 : 0.6,
                  }}
                  disabled={!validateSignUp()}
                >
                  Sign Up
                </button>
                <p style={{ color: "#5d6d7c", fontSize: "14px" }}>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      document.getElementById(
                        "form-sign-up-in-container"
                      ).style.transform = "translateX(-35%)";
                    }}
                    style={{
                      color: "#072138",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </form>

            {/* Sign In */}
            <form
              onSubmit={handleSubmitSignIn}
              style={{ width: "100%", paddingLeft: "10px" }}
            >
              <div className="sign-in">
                <h1 style={{ marginBottom: "20px", fontSize: "40px" }}>
                  Sign In
                </h1>
                <div className="form-control-authentication">
                  <input
                    type="text"
                    name=""
                    id="student-id"
                    placeholder="Ex: 202434567"
                    className="form-control-input"
                    required
                    onChange={(e) => {
                      setStudentId(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "") // Remove non-numeric characters
                        .slice(0, 9); // Allow only numbers, max length 9
                    }}
                  />
                  <label htmlFor="student-id">Student ID*</label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type={isClickShowPasswordSignIn ? "text" : "password"}
                    name=""
                    id="password-sign-in"
                    className="form-control-input"
                    placeholder=""
                    required
                    onChange={(e) => {
                      setPasswordSignIn(e.target.value);
                    }}
                  />
                  {isClickShowPasswordSignIn ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={() => {
                        setIsClickShowPasswordSignIn(
                          !isClickShowPasswordSignIn
                        );
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => {
                        setIsClickShowPasswordSignIn(
                          !isClickShowPasswordSignIn
                        );
                      }}
                    ></i>
                  )}
                  <label htmlFor="password-sign-in">Password*</label>
                </div>
                <div className="form-control-authentication">
                  <span
                    onClick={() => {
                      document.getElementById(
                        "form-sign-up-in-container"
                      ).style.transform = "translateX(-70%)";
                    }}
                    style={{
                      color: "#5d6d7c",
                      fontSize: "14px",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Forgot password?
                  </span>
                </div>
                <button
                  className="btn-authentication"
                  style={{
                    backgroundColor: validateSignIn() ? "#ec7207" : "#d3d3d3",
                    color: validateSignIn() ? "#fff" : "#8c8c8c",
                    cursor: validateSignIn() ? "pointer" : "not-allowed",
                    pointerEvents: validateSignIn() ? "auto" : "none",
                    opacity: validateSignIn() ? 1 : 0.6,
                  }}
                  disabled={validateSignIn()}
                >
                  Sign In
                </button>
                <br />
                <p
                  style={{
                    color: "#5d6d7c",
                    fontSize: "14px",
                  }}
                >
                  No account?{" "}
                  <span
                    onClick={() => {
                      document.getElementById(
                        "form-sign-up-in-container"
                      ).style.transform = "translateX(0)";
                    }}
                    style={{
                      color: "#072138",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </form>

            {/* Forgot password */}
            <form
              onSubmit={handleSubmitForgotPassword}
              style={{ width: "100%", paddingLeft: "23px" }}
            >
              <div className="sign-in">
                <h1 style={{ marginBottom: "20px", fontSize: "40px" }}>
                  Forgot Password
                </h1>
                <div className="form-control-authentication">
                  <input
                    type="email"
                    name=""
                    id="email-forgot-password"
                    placeholder="Ex: demo@ex.io"
                    className="form-control-input"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label htmlFor="email-forgot-password">Email*</label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type="text"
                    name=""
                    id="verification-code"
                    placeholder="Ex: 369521"
                    className="form-control-input"
                    required
                    style={{
                      backgroundColor: isSentVerificationCodeEmail
                        ? "#fff"
                        : "#f0f0f0",
                      opacity: isSentVerificationCodeEmail ? 1 : 0.6,
                      cursor: isSentVerificationCodeEmail
                        ? "auto"
                        : "not-allowed",
                    }}
                    disabled={!isSentVerificationCodeEmail}
                    onChange={(e) => {
                      setStudentId(e.target.value);
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "") // Remove non-numeric characters
                        .slice(0, 6); // Allow only numbers, max length 9
                    }}
                  />
                  <label
                    htmlFor="verification-code"
                    style={{
                      backgroundColor: isSentVerificationCodeEmail
                        ? "#fff"
                        : "#f6f6f6",
                      opacity: isSentVerificationCodeEmail ? 1 : 0.9,
                    }}
                  >
                    Verification Code*
                  </label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type={isClickShowNewPassword ? "text" : "password"}
                    style={{
                      backgroundColor: isSentVerificationCodeEmail
                        ? "#fff"
                        : "#f0f0f0",
                      opacity: isSentVerificationCodeEmail ? 1 : 0.6,
                      cursor: isSentVerificationCodeEmail
                        ? "auto"
                        : "not-allowed",
                    }}
                    name=""
                    id="password-forgot-password"
                    className="form-control-input"
                    placeholder=""
                    required
                    disabled={!isSentVerificationCodeEmail}
                    onChange={(e) => {
                      setPasswordSignIn(e.target.value);
                    }}
                  />
                  {isClickShowNewPassword ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      style={{
                        pointerEvents: isSentVerificationCodeEmail
                          ? "auto"
                          : "none",
                      }}
                      onClick={() => {
                        setIsClickShowNewPassword(!isClickShowNewPassword);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye"
                      style={{
                        pointerEvents: isSentVerificationCodeEmail
                          ? "auto"
                          : "none",
                      }}
                      onClick={() => {
                        setIsClickShowNewPassword(!isClickShowNewPassword);
                      }}
                    ></i>
                  )}
                  <label
                    htmlFor="password-forgot-password"
                    style={{
                      backgroundColor: isSentVerificationCodeEmail
                        ? "#fff"
                        : "#F6F6F6",
                      opacity: isSentVerificationCodeEmail ? 1 : 0.9,
                    }}
                  >
                    New Password*
                  </label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type={isClickShowConfirmNewPassword ? "text" : "password"}
                    style={{
                      backgroundColor: isSentVerificationCodeEmail
                        ? "#fff"
                        : "#f0f0f0",
                      opacity: isSentVerificationCodeEmail ? 1 : 0.6,
                      cursor: isSentVerificationCodeEmail
                        ? "auto"
                        : "not-allowed",
                    }}
                    name=""
                    id="confirm-password-forgot-password"
                    className="form-control-input"
                    placeholder=""
                    required
                    disabled={!isSentVerificationCodeEmail}
                    onChange={(e) => {
                      setPasswordSignIn(e.target.value);
                    }}
                  />
                  {isClickShowConfirmNewPassword ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={() => {
                        setIsClickShowConfirmNewPassword(
                          !isClickShowConfirmNewPassword
                        );
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => {
                        setIsClickShowConfirmNewPassword(
                          !isClickShowConfirmNewPassword
                        );
                      }}
                    ></i>
                  )}
                  <label
                    htmlFor="confirm-password-forgot-password"
                    style={{
                      backgroundColor: isSentVerificationCodeEmail
                        ? "#fff"
                        : "#F6F6F6",
                      opacity: isSentVerificationCodeEmail ? 1 : 0.9,
                    }}
                  >
                    Confirm New Password*
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="btn-authentication"
                    style={{
                      backgroundColor:
                        email.trim() !== "" ? "#ec7207" : "#d3d3d3",
                      color: email.trim() !== "" ? "#fff" : "#8c8c8c",
                      cursor: email.trim() !== "" ? "pointer" : "not-allowed",
                      pointerEvents: email.trim() !== "" ? "auto" : "none",
                      opacity: email.trim() !== "" ? 1 : 0.6,
                    }}
                    disabled={email.trim() !== "" ? false : true}
                  >
                    {!isSentVerificationCodeEmail ? "Send Code" : "Resend Code"}
                  </button>
                  {isSentVerificationCodeEmail && (
                    <button
                      className="btn-authentication"
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid #ec7207",
                        color: "#072138",
                        cursor: email.trim() !== "" ? "pointer" : "not-allowed",
                        pointerEvents: email.trim() !== "" ? "auto" : "none",
                      }}
                      disabled={email.trim() !== "" ? false : true}
                    >
                      Change Password
                    </button>
                  )}
                </div>
                <br />
                <p
                  style={{
                    color: "#5d6d7c",
                    fontSize: "14px",
                  }}
                >
                  <span
                    onClick={() => {
                      document.getElementById(
                        "form-sign-up-in-container"
                      ).style.transform = "translateX(-35%)";
                    }}
                    style={{
                      color: "#072138",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fa-solid fa-arrow-left"></i> Cancel
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="img-right">
          <img src="../Image/logo-2.png" alt="picture" loading="lazy" />
        </div>
      </div>

      {/* Modal Policy */}
      <div id="policyModal" className="modal">
        <div className="modal-content">
          <h2>Terms & Recovery Guide</h2>

          <div className="policy-section">
            <h3>Users agree NOT to:</h3>
            <ul>
              <li>Use the website for any unlawful purpose.</li>
              <li>
                Disrupt, interfere with, or attempt unauthorized access to the
                website or its systems.
              </li>
              <li>
                Upload or share content that is false, offensive, violates
                privacy, or infringes copyrights.
              </li>
              <li>
                Provide inaccurate information when creating an account (if
                applicable).
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>We reserve the right to:</h3>
            <ul>
              <li>
                Suspend, terminate, or limit your access if any violation is
                detected.
              </li>
              <li>
                Modify or temporarily disable any part of the website without
                prior notice.
              </li>
              <li>
                Collect and use user information as described in our Privacy
                Policy.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>For individuals seeking to reclaim lost items:</h3>
            <ul>
              <li>
                You <strong>MUST</strong> provide a detailed description of the
                lost item for verification with the holder.
              </li>
              <li>
                You are <strong>REQUIRED</strong> to create a post in order to
                receive a verification code.
              </li>
              <li>
                The post <strong>MUST</strong> include a complete and accurate
                description of the lost item.
              </li>
              <li>
                Users are responsible for regularly checking their post on the
                website for updates.
              </li>
              <li>
                You <strong>MUST</strong> present the verification code when
                retrieving your item.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>For individuals holding found items:</h3>
            <ul>
              <li>
                You are <strong>RESPONSIBLE</strong> for verifying the
                claimant's verification code and item description to ensure they
                match the item in your possession.
              </li>
              <li>
                You are <strong>RESPONSIBLE</strong> for creating a post to
                assist in returning the item to its rightful owner.
              </li>
            </ul>
          </div>

          <a
            className="close"
            href="#"
            onClick={() => {
              setIsAgreeTerm(true);
            }}
          >
            I got it
          </a>
        </div>
      </div>
    </>
  );
}
