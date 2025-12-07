export default function Profile() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gap: "20px",
          position: "relative",
        }}
      >
        {/* Menu for profile */}
        <div
          style={{
            backgroundColor: "#ffbd83",
            marginLeft: "-100px",
            borderTopRightRadius: "12px",
            padding: "40px 20px",
            marginTop: "100px",
            borderBottomRightRadius: "12px",
            position: "relative",
            height: "700px",
            width: "70%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {/* Icon */}
            <img
              src="./Image/user_icon.png"
              alt="avatar"
              loading="lazy"
              style={{
                borderRadius: "100%",
                width: "60px",
              }}
            />
            <h3
              style={{
                fontWeight: "500",
              }}
            >
              User name
            </h3>
          </div>

          {/* Personal information  */}
          <a
            href="/profile"
            style={{
              fontWeight: "400",
              lineHeight: "50px",
            }}
          >
            {" "}
            <i className="fa-solid fa-user"></i> Personal information
          </a>
          <br />
          {/* My post */}
          <a
            href="/my-post"
            style={{
              fontWeight: "400",
              lineHeight: "50px",
            }}
          >
            {" "}
            <i className="fa-solid fa-sim-card"></i> My post
          </a>
          <br />
          {/* Messeges */}
          <a
            href="/messeges"
            style={{
              fontWeight: "400",
              lineHeight: "50px",
            }}
          >
            {" "}
            <i className="fa-solid fa-envelope"></i> Messeges
          </a>
          <br />
          {/* Notifications */}
          <a
            href="/notification"
            style={{
              fontWeight: "400",
              lineHeight: "50px",
            }}
          >
            {" "}
            <i className="fa-solid fa-mobile-vibrate"></i> Notifications
          </a>
          <br />
          {/* Log out */}
          <a
            href="/log-out"
            style={{
              fontWeight: "400",
              position: "absolute",
              bottom: "20px",
            }}
          >
            {" "}
            <i className="fa-solid fa-arrow-right-from-bracket"></i>Log out
          </a>
        </div>

        {/* Name of profile */}
        <div style={{ margin: "auto", marginBottom: "37%", display: "flex" }}>
          <div>
            <h1
              style={{
                fontFamily: "Mochiy Pop One, sans-serif",
                fontSize: "20px",
                fontWeight: "100",
                marginLeft: "10px",
              }}
            >
              My profile
            </h1>
            <table
              border="0"
              style={{
                padding: "10px",
                textAlign: "left",
                verticalAlign: "top",
                width: "100%",
              }}
            >
              <tbody>
                <tr className="table-tr">
                  <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                    <label className="input">Name: </label>
                  </th>
                  <td style={{ verticalAlign: "top" }} className="table-td">
                    <input
                      placeholder="Ex: Jennie Nguyen"
                      type="text"
                      className="input"
                    />
                  </td>
                </tr>
                <tr className="table-tr">
                  <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                    <label className="input">Phone number: </label>
                  </th>
                  <td style={{ verticalAlign: "top" }} className="table-td">
                    <input
                      placeholder="Ex: 123 456 789"
                      type="number"
                      className="input"
                    />
                  </td>
                </tr>
                <tr className="table-tr">
                  <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                    <label className="input">E-mail: </label>
                  </th>
                  <td style={{ verticalAlign: "top" }} className="table-td">
                    <input
                      placeholder="Ex: demo@ex.io"
                      type="email"
                      className="input"
                    />
                  </td>
                </tr>
                <tr className="table-tr">
                  <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                    <label className="input">New pasword: </label>
                  </th>
                  <td style={{ verticalAlign: "top" }} className="table-td">
                    <input
                      placeholder="Enter new pasword"
                      type="password"
                      className="input"
                    />
                  </td>
                </tr>
                <tr className="table-tr">
                  <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                    <label className="input">Old password: </label>
                  </th>
                  <td style={{ verticalAlign: "top" }} className="table-td">
                    <input
                      placeholder="Confirm new password"
                      type="password"
                      className="input"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Avatar */}
          <div>
            <img
              src="./Image/keychain.avif"
              alt="avatar"
              loading="lazy"
              style={{
                borderRadius: "12px",
                width: "300px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
