import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Search() {
  let [isDropdownOpenType, setIsDropdownOpenType] = useState(false);
  let [isDropdownOpenLocation, setIsDropdownOpenLocation] = useState(false);
  return (
    <>
      {/* Helmet for setting the page title */}
      <Helmet>
        <title>Search | Back2Me </title>
      </Helmet>

      <form onSubmit={() => {}} className="search-form">
        <div className="filter">
          <div className="top-filter">
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
                }}
              >
                Status
              </p>
              <input
                type="radio"
                name="status"
                id="lost"
                defaultChecked
                style={{ marginLeft: "20px" }}
              />{" "}
              <label htmlFor="lost" style={{ marginRight: "40px" }}>
                <strong>Lost</strong>
              </label>
              <input type="radio" name="status" id="found" />{" "}
              <label htmlFor="found">
                <strong>Found</strong>
              </label>
            </div>
            <div className="detail-filter">
              <p>
                <label htmlFor="type">Type of Stuff</label>
              </p>
              <select
                name=""
                id="type"
                onClick={() => {
                  setIsDropdownOpenType(!isDropdownOpenType);
                }}
                className="form-control"
              >
                <option value="">Select type</option>
                <option value="electronics">Electronics</option>
                <option value="clothes">Clothes</option>
                <option value="documents">Documents</option>
                <option value="accessories">Accessories</option>
                <option value="others">Others</option>
              </select>
              {isDropdownOpenType ? (
                <i className="fa-solid fa-caret-up caret-type"></i>
              ) : (
                <i className="fa-solid fa-caret-down caret-type"></i>
              )}
            </div>
            <div className="detail-filter">
              <p>
                <label htmlFor="name">Stuff name or ID</label>
              </p>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Enter name or ID"
              />
            </div>
            <div className="detail-filter">
              <p>
                <label htmlFor="location">Location</label>
              </p>
              <select
                name=""
                id="location"
                onClick={() => {
                  setIsDropdownOpenLocation(!isDropdownOpenLocation);
                }}
                className="form-control"
              >
                <option value="">Select location</option>
                <option value="500">500 Hall</option>
                <option value="600">600 Hall</option>
              </select>
              {isDropdownOpenLocation ? (
                <i className="fa-solid fa-caret-up caret-type"></i>
              ) : (
                <i className="fa-solid fa-caret-down caret-type"></i>
              )}
            </div>
            <button className="btn-use-filter">Use Filter</button>
          </div>
        </div>
      </form>

      {/* Cards section */}
      <div className="card-row">
        <div className="card">
          <div style={{ width: "100%", height: "435px" }} className="cardhover">
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
          </div>
          <div className="btn-card-see-more">
            <a
              href="/detail-post/1"
              className="btn-yellow"
              style={{ marginTop: "20px", textAlign: "center", width: "100%" }}
            >
              View Details <i className="fa-solid fa-eye"></i>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                "https://back2me.vercel.app/detail-post/1"
              )}&quote=Check%20out%20this%20awesome%20stuff!`}
              className="btn-with-border"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Found <i class="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>
        </div>
        <div className="card">
          <div style={{ width: "100%", height: "435px" }} className="cardhover">
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
                Keychain
              </h3>
              <p>
                Lost my keychain last week near Central Park. If found, please
                contact me!
              </p>
            </div>
          </div>
          <div className="btn-card-see-more">
            <a
              href="/detail-post/1"
              className="btn-yellow"
              style={{ marginTop: "20px", textAlign: "center", width: "100%" }}
            >
              View Details <i className="fa-solid fa-eye"></i>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                "https://back2me.vercel.app/detail-post/1"
              )}&quote=Check%20out%20this%20awesome%20stuff!`}
              className="btn-with-border"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Found <i class="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>
        </div>
        <div className="card">
          <div style={{ width: "100%", height: "435px" }} className="cardhover">
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
                Keychain
              </h3>
              <p>
                Lost my keychain last week near Central Park. If found, please
                contact me!
              </p>
            </div>
          </div>
          <div className="btn-card-see-more">
            <a
              href="/detail-post/1"
              className="btn-yellow"
              style={{ marginTop: "20px", textAlign: "center", width: "100%" }}
            >
              View Details <i className="fa-solid fa-eye"></i>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                "https://back2me.vercel.app/detail-post/1"
              )}&quote=Check%20out%20this%20awesome%20stuff!`}
              className="btn-with-border"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Found <i class="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>
        </div>
        <div className="card">
          <div style={{ width: "100%", height: "435px" }} className="cardhover">
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
                Keychain
              </h3>
              <p>
                Lost my keychain last week near Central Park. If found, please
                contact me!
              </p>
            </div>
          </div>
          <div className="btn-card-see-more">
            <a
              href="/detail-post/1"
              className="btn-yellow"
              style={{ marginTop: "20px", textAlign: "center", width: "100%" }}
            >
              View Details <i className="fa-solid fa-eye"></i>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                "https://back2me.vercel.app/detail-post/1"
              )}&quote=Check%20out%20this%20awesome%20stuff!`}
              className="btn-with-border"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Found <i class="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>
        </div>
        <div className="card">
          <div style={{ width: "100%", height: "435px" }} className="cardhover">
            <img
              src="./Image/ipad.webp"
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
          </div>
          <div className="btn-card-see-more">
            <a
              href="/detail-post/1"
              className="btn-yellow"
              style={{ marginTop: "20px", textAlign: "center", width: "100%" }}
            >
              View Details <i className="fa-solid fa-eye"></i>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                "https://back2me.vercel.app/detail-post/1"
              )}&quote=Check%20out%20this%20awesome%20stuff!`}
              className="btn-with-border"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Found <i class="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
