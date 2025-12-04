import { useState } from "react";
import { Helmet } from "react-helmet-async";
import InputMask from "react-input-mask";

export default function Authentication() {
  // Variables
  let [isAgreeTerm, setIsAgreeTerm] = useState(false);
  let [isClickShowPassword, setIsClickShowPassword] = useState(false);
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
                    <label htmlFor="first-name">First Name</label>
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
                    <label htmlFor="last-name">Last Name</label>
                  </div>
                </div>
                <div className="form-control-authentication">
                  <InputMask
                    mask={"999-999-9999"}
                    value={phone || ""}
                    placeholder="Ex: 678-456-7890"
                    className="form-control-input p-2"
                    id="phone"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  ></InputMask>
                  <label htmlFor="phone">Phone Number</label>
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
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type={isClickShowPassword ? "text" : "password"}
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
                  {isClickShowPassword ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={() => {
                        setIsClickShowPassword(!isClickShowPassword);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => {
                        setIsClickShowPassword(!isClickShowPassword);
                      }}
                    ></i>
                  )}
                  <label htmlFor="password">Password</label>
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
                  <label htmlFor="confirm-password">Confirm Password</label>
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
                      <a href="#policyModal">
                        {" "}
                        "User Terms & Recovery Rules"
                      </a>{" "}
                      to read and agree
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
                  <label htmlFor="student-id">Student ID</label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type={isClickShowPassword ? "text" : "password"}
                    name=""
                    id="password-sign-in"
                    className="form-control-input"
                    placeholder=""
                    required
                    onChange={(e) => {
                      setPasswordSignIn(e.target.value);
                    }}
                  />
                  {isClickShowPassword ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={() => {
                        setIsClickShowPassword(!isClickShowPassword);
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => {
                        setIsClickShowPassword(!isClickShowPassword);
                      }}
                    ></i>
                  )}
                  <label htmlFor="password-sign-in">Password</label>
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
                  <label htmlFor="email-forgot-password">Email</label>
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
                    Verification Code
                  </label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type={isClickShowPassword ? "text" : "password"}
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
                  {isClickShowPassword ? (
                    <i
                      className="fa-solid fa-eye-slash"
                      style={{
                        pointerEvents: isSentVerificationCodeEmail
                          ? "auto"
                          : "none",
                      }}
                      onClick={() => {
                        setIsClickShowPassword(!isClickShowPassword);
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
                        setIsClickShowPassword(!isClickShowPassword);
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
                    New Password
                  </label>
                </div>
                <div className="form-control-authentication">
                  <input
                    type={isClickShowPassword ? "text" : "password"}
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
                  <label
                    htmlFor="confirm-password-forgot-password"
                    style={{
                      backgroundColor: isSentVerificationCodeEmail
                        ? "#fff"
                        : "#F6F6F6",
                      opacity: isSentVerificationCodeEmail ? 1 : 0.9,
                    }}
                  >
                    Confirm New Password
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
                    Resend Code
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
          <img src="../Image/logo-2.png" alt="picture" />
        </div>
      </div>

      {/* Modal Policy */}
      <div id="policyModal" className="modal">
        <div className="modal-content">
          <h2>Privacy & Policy</h2>

          <div className="policy-section">
            <h3>Đối với người mất đồ / muốn lấy lại đồ / tìm đồ</h3>
            <ul>
              <li>
                Người dùng có trách nhiệm kiểm tra thường xuyên bài đăng của
                mình trên website.
              </li>
              <li>
                Khi muốn nhận lại đồ,{" "}
                <strong>bắt buộc phải đăng một bài</strong> để được cấp mã code.
              </li>
              <li>
                Trong bài đăng phải ghi rõ mô tả chi tiết vật bị mất để đối
                chiếu với bên giữ đồ khi xác thực.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>Đối với người giữ đồ</h3>
            <ul>
              <li>
                Có trách nhiệm kiểm tra mã code và thông tin mô tả của người đến
                nhận đồ xem có trùng khớp hay không.
              </li>
              <li>Có trách nhiệm đăng bài để trả lại đồ cho người mất.</li>
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
