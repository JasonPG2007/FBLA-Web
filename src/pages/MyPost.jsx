import SidebarProfile from "../components/SidebarProfile";

export default function MyPost() {
  return (
    <>
      <div className="sidebar-and-content"
        style={{
          display: "grid",
          gridTemplateColumns: "15% 85%",
          gap: "50px",
          // backgroundColor: "pink",
          position: "relative",
        }}
      >
        {/* Menu for profile */}
        <SidebarProfile></SidebarProfile>

        {/* Post similar to you */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "100px",
            gap: "30px",
          }}
        >
          <div className="status-filter">
            <p
              style={{
                backgroundColor: "#072138",
                width: "max-content",
                color: "white",
                padding: "1px 30px",
                borderRadius: "8px",
                position: "absolute",
                top: "-50%",
                left: "0",
                marginTop: "20px",
              }}
            >
              Status
            </p>
            <input type="radio" name="status" id="search-all" defaultChecked />{" "}
            <label htmlFor="search-all" id="search-all-label">
              <strong>All</strong>
            </label>
            <input
              type="radio"
              name="status"
              id="lost"
              style={{ marginLeft: "20px", marginTop: "25px" }}
            />{" "}
            <label htmlFor="lost" style={{ marginRight: "25px" }}>
              <strong>Lost</strong>
            </label>
            <input type="radio" name="status" id="found" />{" "}
            <label htmlFor="found">
              <strong>Found</strong>
            </label>
          </div>

          {/* Card */}
          <div className="newest-post-container">
            {/* Card img 1 */}
            <div className="card">
              <img
                src="./Image/ipad.webp"
                alt="picture of stuffs"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
              />
              <div className="card-text">
                <h3 style={{ fontWeight: "500", marginBottom: "10px" }}>
                  <a href="/detail-post">Ipad 11th Gen</a>
                </h3>
                <p>
                  <a href="/detail-post">
                    Lost my Ipad 11th Gen last week near Central Park. If found,
                    please contact me!
                  </a>
                </p>
              </div>

              {/* Status */}
              <div className="status-post-lost">Lost</div>
            </div>

            {/* Card img 2 */}
            <div className="card">
              <img
                src="./Image/charger.webp"
                alt="picture of stuffs"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
              />
              <div className="card-text">
                <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                  Charger USB-C
                </h3>
                <p>
                  Lost my charger USB-C last week near Central Park. If found,
                  please contact me!
                </p>
              </div>

              {/* Status */}
              <div className="status-post-found">Found</div>
            </div>

            {/* Card img 3 */}
            <div className="card">
              <img
                src="./Image/chromebook.jpg"
                alt="picture of stuffs"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
              />
              <div className="card-text">
                <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                  Chromebook
                </h3>
                <p>
                  Lost my chromebook last week near Central Park. If found,
                  please contact me!
                </p>
              </div>

              {/* Status */}
              <div className="status-post-lost">Lost</div>
            </div>

            {/* Card img 4 */}
            <div className="card">
              <img
                src="./Image/earbuds.webp"
                alt="picture of stuffs"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
              />
              <div className="card-text">
                <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                  Earbuds
                </h3>
                <p>
                  Lost my earbuds last week near Central Park. If found, please
                  contact me!
                </p>
              </div>

              {/* Status */}
              <div className="status-post-lost">Lost</div>
            </div>

            {/* Card img 1 */}
            <div className="card">
              <img
                src="./Image/phone.webp"
                alt="picture of stuffs"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
              />
              <div className="card-text">
                <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                  Sponebob
                </h3>
                <p>
                  Lost my sponebob plush toy last week near Central Park. If
                  found, please contact me!
                </p>
              </div>

              {/* Status */}
              <div className="status-post-found">Found</div>
            </div>

            {/* Card img 2 */}
            <div className="card">
              <img
                src="./Image/key.jpg"
                alt="picture of stuffs"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
              />
              <div className="card-text">
                <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Key</h3>
                <p>
                  Lost my sponebob plush toy last week near Central Park. If
                  found, please contact me!
                </p>
              </div>

              {/* Status */}
              <div className="status-post-lost">Lost</div>
            </div>

            {/* Card img 3 */}
            <div className="card">
              <img
                src="./Image/wallet.jpg"
                alt="picture of stuffs"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
              />
              <div className="card-text">
                <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                  Wallet
                </h3>
                <p>
                  Lost my wallet last week near Central Park. If found, please
                  contact me!
                </p>
              </div>

              {/* Status */}
              <div className="status-post-found">Found</div>
            </div>

            {/* Card img 4 */}
            <div className="card">
              <img
                src="./Image/keychain.avif"
                alt="picture of stuffs"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  backgroundColor: "white",
                }}
              />
              <div className="card-text">
                <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>
                  Keychain
                </h3>
                <p>
                  Lost my keychain last week near Central Park. If found, please
                  contact me!
                </p>
              </div>

              {/* Status */}
              <div className="status-post-found">Found</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
