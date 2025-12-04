export default function Header() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#fffde3ff",
        }}
      >
        <a href="/">
          <h1
            className="homepageh1"
            style={{ fontFamily: "Mochiy Pop One, sans-serif" }}
          >
            Back2Me
          </h1>
        </a>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <a href="/about">
            <p className="homepageh2" style={{ marginRight: "40px" }}>
              About us
            </p>
          </a>
          <a href="/how-it-works">
            <p className="homepageh2" style={{ marginRight: "40px" }}>
              How it works
            </p>
          </a>
          <a href="/lost-and-found">
            <p className="homepageh2" style={{ marginRight: "40px" }}>
              Lost & Found
            </p>
          </a>
          <a href="/profile"><img width={50} src="./Image/user_icon.png" alt="avatar" /></a>
          <button
            className="homepageh3"
            style={{
              marginLeft: "60px",
              backgroundColor: "#f78f2eff",
              color: "white",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Report a post
          </button>
        </div>
      </div>
    </>
  );
}
