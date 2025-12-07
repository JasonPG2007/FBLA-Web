import { Helmet } from "react-helmet-async";

export default function Header() {
  function handleChangeImage(srcOld, srcNew, idImg) {
    document.getElementById("big-img").src = srcNew;
    document.getElementById(idImg).src = srcOld;
  }

  return (
    <>
      {/* Helmet for setting the page title */}
      <Helmet>
        <title>Detail - Ipad | Back2Me </title>
      </Helmet>

      {/* Menu bar for post */}
      <div
        style={{
          display: "flex",
          // justifyContent: "flex-start",
          alignItems: "center",
          padding: "30px 1px",
          fontWeight: "300",
          color: "#072138",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 1px",
          }}
        >
          <a href="/">
            <p>Main</p>
          </a>
          <i className="fa-solid fa-angle-right icon-light"></i>
          <a href="/search">
            <p>Search</p>
          </a>
          <i className="fa-solid fa-angle-right icon-light"></i>
          <a href="">
            <p>Post</p>
          </a>
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <h1
          style={{
            color: "#072138",
            fontWeight: "400",
            padding: "20px 0",
            fontSize: "40px",
          }}
        >
          Ipad
        </h1>
        <button
          style={{
            marginLeft: "auto",
            height: "max-content",
            border: "none",
            backgroundColor: "#fdcc4b",
            padding: "10px 15px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {" "}
          Contact owner
        </button>
      </div>

      {/* Image of post */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "200px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80% 20%",
            gap: "20px",
          }}
        >
          <div className="post-image-container">
            <div>
              <img
                src="./Image/ipad.webp"
                alt="picture of stuff"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  backgroundColor: "white",
                  borderRadius: "20px",
                }}
                id="big-img"
              ></img>
            </div>

            <h3
              style={{
                fontWeight: "500",
                textAlign: "center",
                padding: "5px 10px 10px 0",
              }}
            >
              ID 12345
            </h3>
          </div>

          {/* Post image mini */}
          <div className="post-image-mini">
            <img
              src="./Image/earbuds.webp"
              alt="picture of stuff"
              loading="lazy"
              style={{
                width: "80%",
                height: "80px",
                objectFit: "cover",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
              id="img-1"
              onClick={() =>
                handleChangeImage(
                  document.getElementById("big-img").src,
                  document.getElementById("img-1").src,
                  "img-1"
                )
              }
            ></img>
            <img
              src="./Image/charger.webp"
              alt="picture of stuff"
              loading="lazy"
              style={{
                width: "80%",
                height: "80px",
                objectFit: "cover",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
              id="img-2"
              onClick={() =>
                handleChangeImage(
                  document.getElementById("big-img").src,
                  document.getElementById("img-2").src,
                  "img-2"
                )
              }
            ></img>
            <img
              src="./Image/chromebook.jpg"
              alt="picture of stuff"
              loading="lazy"
              style={{
                width: "80%",
                height: "80px",
                objectFit: "cover",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
              id="img-3"
              onClick={() =>
                handleChangeImage(
                  document.getElementById("big-img").src,
                  document.getElementById("img-3").src,
                  "img-3"
                )
              }
            ></img>
          </div>
        </div>

        {/* About me */}
        <div>
          <h1
            style={{
              fontFamily: "Mochiy Pop One, sans-serif",
              fontSize: "25px",
              marginBottom: "10px",
              fontWeight: "100",
              marginLeft: "10px",
            }}
          >
            About me
          </h1>
          <table
            border="0"
            style={{
              padding: "10px",
              textAlign: "left",
              verticalAlign: "top",
            }}
          >
            <tbody>
              <tr className="table-tr">
                <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                  Item name:{" "}
                </th>
                <td style={{ verticalAlign: "top" }} className="table-td">
                  Ipad 11 pro Max
                </td>
              </tr>
              <tr className="table-tr">
                <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                  Category:{" "}
                </th>
                <td style={{ verticalAlign: "top" }} className="table-td">
                  Electronics
                </td>
              </tr>
              <tr className="table-tr">
                <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                  Date lost:{" "}
                </th>
                <td style={{ verticalAlign: "top" }} className="table-td">
                  13/1/2025
                </td>
              </tr>
              <tr className="table-tr">
                <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                  Location lost:{" "}
                </th>
                <td style={{ verticalAlign: "top" }} className="table-td">
                  Hall 600
                </td>
              </tr>
              <tr className="table-tr">
                <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                  Status:{" "}
                </th>
                <td style={{ verticalAlign: "top" }} className="table-td">
                  Lost
                </td>
              </tr>
              <tr className="table-tr">
                <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                  Description:{" "}
                </th>
                <td style={{ verticalAlign: "top" }} className="table-td">
                  A silver Apple iPad, approximately 10–11 inches, with a black
                  front bezel.The device is inside a dark gray protective case
                  with a small tear near the corner.The back of the iPad has
                  light surface scratches and a faint sticker residue.The screen
                  is intact with no visible cracks. No charger or accessories
                  were included.The device powers on but is locked with a
                  passcode.
                </td>
              </tr>
            </tbody>
          </table>

          {/* Contacts */}
          <div>
            <h1
              style={{
                fontFamily: "Mochiy Pop One, sans-serif",
                fontSize: "20px",
                fontWeight: "100",
                marginLeft: "10px",
              }}
            >
              Contacts
            </h1>
            <table
              border="0"
              style={{
                padding: "10px",
                textAlign: "left",
                verticalAlign: "top",
              }}
            >
              <tbody>
                <tr className="table-tr">
                  <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                    Name:{" "}
                  </th>
                  <td style={{ verticalAlign: "top" }} className="table-td">
                    Thi Dan Tam Nguyen
                  </td>
                </tr>
                <tr className="table-tr">
                  <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                    Your phone:{" "}
                  </th>
                  <td style={{ verticalAlign: "top" }} className="table-td">
                    +1 678 123 1432
                  </td>
                </tr>
                <tr className="table-tr">
                  <th style={{ verticalAlign: "top", fontWeight: "600" }}>
                    E-mail:{" "}
                  </th>
                  <td style={{ verticalAlign: "top" }} className="table-td">
                    tamnguyendng43@g.gcpsk.org
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2 buttons */}
          <div className="btn-card-see-more">
            <a
              href="/detail-post/1"
              className="btn-yellow"
              style={{ marginTop: "20px", textAlign: "center", width: "100%" }}
            >
              Track <i className="fa-regular fa-bookmark"></i>
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fback2me.vercel.app%2Fdetail-post%2F1&amp;quote=Check%20out%20this%20awesome%20stuff!"
              className="btn-with-border"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Found <i className="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
