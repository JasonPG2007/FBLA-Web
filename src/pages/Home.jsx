export default function Home() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "55% 30%" }}>
        <div style={{ marginTop: "83px" }}>
          <p
            style={{
              fontSize: "50px",
              marginLeft: "-8%",
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
              marginLeft: "20%",
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
              width: "84%",
              marginTop: "25px",
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
          width="850"
          style={{ objectFit: "cover" }}
        />
      </div>
    </>
  );
}
