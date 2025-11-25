import { useState } from "react";
import InputMask from "react-input-mask";

export default function SignUp() {
  // Variables
  let [phone, setPhone] = useState("");
  let [isClickPhoneNumberInput, setIsClickPhoneNumberInput] = useState(false);

  // Functions
  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here
  }

  return (
    <>
      <div className="authentication-container">
        <form className="form-box" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <div className="form-control-authentication">
              <input
                type="text"
                name=""
                id="first-name"
                placeholder="Jason"
                className="form-control-input"
                autoFocus
                required
              />
              <label htmlFor="first-name">First Name</label>
            </div>
            <div className="form-control-authentication">
              <input
                type="text"
                name=""
                id="last-name"
                placeholder="Jason"
                className="form-control-input"
                required
              />
              <label htmlFor="last-name">Last Name</label>
            </div>
          </div>
          <div className="form-control-authentication">
            {isClickPhoneNumberInput ? (
              <InputMask
                mask={"999-999-9999"}
                value={phone || ""}
                placeholder="678-456-7890"
                className="form-control-input p-2"
                id="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></InputMask>
            ) : (
              <input
                type="text"
                name=""
                id="last-name"
                placeholder="Jason"
                className="form-control-input"
                required
                onClick={() => {
                  setIsClickPhoneNumberInput(!isClickPhoneNumberInput);
                }}
              />
            )}
            <label htmlFor="phone">Phone Number</label>
          </div>
          <div className="form-control-authentication">
            <input
              type="email"
              name=""
              id="email"
              placeholder="example@ex.com"
              className="form-control-input"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-control-authentication">
            <input
              type="password"
              name=""
              id="password"
              className="form-control-input"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn-authentication">Sign Up</button>
          <p>
            Already have an account? <a href="/sign-in">Sign In</a>
          </p>
        </form>
        <div className="img-right">
          <img src="../Image/logo-2.png" alt="picture" />
        </div>
      </div>
    </>
  );
}
