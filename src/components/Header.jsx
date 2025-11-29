import ModalReportStuff from "./ModalReportStuff";

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
          position: "sticky",
          top: "0",
          zIndex: "1",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
          <img width={50} src="./Image/user_icon.png" alt="avatar" />
          <button
            style={{
              marginLeft: "60px",
              backgroundColor: "#ec7207",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => {
              const modal = document.querySelector(".modal-report-stuff");
              const overlay = document.querySelector(
                ".modal-overlay-report-stuff"
              );
              modal.style.visibility = "visible";
              modal.style.opacity = "1";
              overlay.style.visibility = "visible";
              overlay.style.opacity = "1";
              document.body.style.overflow = "hidden";
            }}
          >
            Report a post
          </button>
        </div>
      </div>

      {/* Modal report stuff component */}
      <ModalReportStuff></ModalReportStuff>
    </>
  );
}
