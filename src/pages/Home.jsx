import { Helmet } from "react-helmet-async";

export default function Home() {
  // Functions
  function handleSearch(e) {
    e.preventDefault();

    window.location.href = "http://localhost:5173/search";
  }

  return (
    <>
      {/* Helmet for setting the page title */}
      <Helmet>
        <title>Lost & Found | Back2Me </title>
      </Helmet>

      <div style={{ display: "grid", gridTemplateColumns: "55% 30%" }}>
        <div style={{ marginTop: "83px" }}>
          <p
            style={{
              fontSize: "50px",
              marginLeft: "2%",
              textAlign: "center",
              width: "100%",
              marginTop: "100px",
              lineHeight: "1.8",
            }}
          >
            We can help find your{" "}
            <strong
              style={{
                fontSize: "55px",
                fontFamily: "Mochiy Pop One, sans-serif",
              }}
            >
              LOST
            </strong>
            <br />
            Stuffs or reunite{" "}
            <strong
              style={{
                fontSize: "55px",
                fontFamily: "Mochiy Pop One, sans-serif",
              }}
            >
              FOUND
            </strong>{" "}
            Stuffs with
            <br />
            their owners
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "50px",
              marginLeft: "30%",
              background: "linear-gradient(to right, #ec7207, #fadf45ff)",
              padding: "20px 20px",
              width: "400px",
              borderRadius: "100px",
              marginTop: "40px",
            }}
          >
            <button
              style={{
                fontSize: "20px",
                border: "none",
                backgroundColor: "transparent",
                cusor: "pointer",
              }}
            >
              <strong>Lost Stuff</strong>
            </button>
            <p style={{ fontSize: "20px" }}>
              {" "}
              <strong>|</strong>
            </p>
            <button
              style={{
                fontSize: "20px",
                border: "none",
                backgroundColor: "transparent",
                cusor: "pointer",
              }}
            >
              {" "}
              <strong>Found Stuff</strong>
            </button>
          </div>

          <p
            style={{
              fontSize: "18px",
              textAlign: "center",
              width: "100%",
              marginTop: "25px",
              marginLeft: "2%",
            }}
          >
            It's super easy and takes only minutes. Just add your stuff's info,
            <br />
            picture, and contact information.
          </p>
        </div>

        <img
          src="./Image/detective.png"
          alt=""
          className="move-up-down"
          width="850"
          loading="lazy"
          style={{ objectFit: "cover" }}
        />
      </div>
      <p
        style={{
          fontSize: "40px",
          marginTop: "35px",
          textAlign: "left",
          color: "#072138",
          marginRight: "90%",
          width: "100%",
          padding: "20px 10px",
        }}
      >
        Learn{" "}
        <span style={{ fontFamily: "Mochiy Pop One, sans-serif" }}>
          how it works
        </span>
      </p>

      {/* Learn how it works */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "30% 70%",
          gap: "30px",
          width: "90%",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            background: "linear-gradient(135deg, #f5f4c2, #ffbd83)",
            borderRadius: "15px",
            position: "relative",
          }}
          className="paddingp"
        >
          <p
            style={{
              fontSize: "20px",
              marginTop: "10px",
              marginBottom: "50px",
              left: "18%",
              color: "white",
              backgroundColor: "#f78f2eff",
              padding: "8px 20px",
              borderRadius: "17px",
              border: "none",
              width: "173px",
              textAlign: "center",
              position: "absolute",
              top: "-30px",
            }}
          >
            Register
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
            dolorem? Autem maiores rem cupiditate expedita vero qui, dolorum
            consequatur quas, nulla odio nemo sint temporibus, itaque doloribus
            aperiam libero aliquam!
          </p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            background: "linear-gradient(135deg, #f5f4c2, #ffbd83)",
            borderRadius: "15px",
            position: "relative",
          }}
          className="paddingp"
        >
          <p
            style={{
              fontSize: "20px",
              width: "30%",
              marginTop: "10px",
              marginBottom: "50px",
              left: "8%",
              color: "white",
              backgroundColor: "#f78f2eff",
              padding: "8px 20px",
              borderRadius: "15px",
              border: "none",
              textAlign: "center",
              position: "absolute",
              top: "-30px",
            }}
          >
            Report a stuff
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
            dolorem? Autem maiores rem cupiditate expedita vero qui, dolorum
            consequatur quas, nulla odio nemo sint temporibus, itaque doloribus
            aperiam libero aliquam!
          </p>
        </div>
      </div>

      {/* 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gap: "30px",
          width: "90%",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            background: "linear-gradient(135deg, #f5f4c2, #ffbd83)",
            borderRadius: "15px",
            position: "relative",
          }}
          className="paddingp"
        >
          <p
            style={{
              fontSize: "20px",
              marginTop: "10px",
              marginBottom: "50px",
              left: "8%",
              color: "white",
              backgroundColor: "#f78f2eff",
              padding: "8px 20px",
              borderRadius: "17px",
              border: "none",
              width: "173px",
              textAlign: "center",
              position: "absolute",
              top: "-30px",
            }}
          >
            Promote
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
            dolorem? Autem maiores rem cupiditate expedita vero qui, dolorum
            consequatur quas, nulla odio nemo sint temporibus, itaque doloribus
            aperiam libero aliquam!
          </p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            background: "linear-gradient(135deg, #f5f4c2, #ffbd83)",
            borderRadius: "15px",
            position: "relative",
          }}
          className="paddingp"
        >
          <p
            style={{
              fontSize: "20px",
              width: "30%",
              marginTop: "10px",
              marginBottom: "50px",
              left: "17%",
              color: "white",
              backgroundColor: "#f78f2eff",
              padding: "8px 20px",
              borderRadius: "15px",
              border: "none",
              textAlign: "center",
              position: "absolute",
              top: "-30px",
            }}
          >
            Reunite
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
            dolorem? Autem maiores rem cupiditate expedita vero qui, dolorum
            consequatur quas, nulla odio nemo sint temporibus, itaque doloribus
            aperiam libero aliquam!
          </p>
        </div>
      </div>

      {/* Newest posts */}
      <div
        style={{
          display: "flex",
          gap: "2%",
          padding: " 70px 10px",
        }}
      >
        <p style={{ fontSize: "30px" }}>
          <span
            style={{
              fontFamily: "Mochiy Pop One, sans-serif",
            }}
          >
            Newest
          </span>{" "}
          posts
        </p>
        <button
          style={{
            backgroundColor: "#fdcc4b",
            border: "none",
            color: "#072138",
            borderRadius: "15px",
            width: "110px",
            height: " 40px",
            marginTop: "9px",
            fontWeight: "bold",
          }}
        >
          show more <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Newest images */}
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
              <a href="/detail-post">Lost my Ipad 11th Gen last week near Central Park. If found,
                please contact me!</a>
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
              Lost my chromebook last week near Central Park. If found, please
              contact me!
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
            <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Earbuds</h3>
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
              Lost my sponebob plush toy last week near Central Park. If found,
              please contact me!
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
              Lost my sponebob plush toy last week near Central Park. If found,
              please contact me!
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
            <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Wallet</h3>
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

      {/* Quick Search */}
      <p
        style={{ fontSize: "30px", textAlign: "center", marginBottom: "30px" }}
      >
        <span
          style={{
            fontFamily: "Mochiy Pop One, sans-serif",
          }}
        >
          Search
        </span>{" "}
        for Stuffs in your
        <span
          style={{
            fontFamily: "Mochiy Pop One, sans-serif",
          }}
        >
          {" "}
          School
        </span>
      </p>

      <form onSubmit={handleSearch}>
        <div className="quick-search">
          <div className="categories">
            <div className="left">
              <label htmlFor="category">Type of Stuff</label>
              <br />
              <select className="select" name="" id="category" required>
                <option value="">Select type</option>
                <option value="">Iphone</option>
              </select>
            </div>
            <div className="right">
              <i className="fa-solid fa-list"></i>
            </div>
          </div>
          <div className="pipe">|</div>
          <div className="location">
            <div className="left">
              <label htmlFor="location">Location</label>
              <br />
              <select className="select" name="" id="location" required>
                <option value="">Select location</option>
                <option value="">Hall 500</option>
                <option value="">Hall 600</option>
              </select>
            </div>
            <div className="right">
              <i className="fa-solid fa-location-dot"></i>
            </div>
          </div>
          <div className="pipe">|</div>
          <div className="btn-quick-search">
            <button>
              Find a stuff <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
